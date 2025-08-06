import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { pool } from "./db";
import { User, UserToken } from "./interfaces";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

const ACCESS_TOKEN_SECRET: Secret =
  process.env.ACCESS_TOKEN_SECRET || "access_secret_123";
const REFRESH_TOKEN_SECRET: Secret =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret_456";

// Auth Middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token)
    return res.status(401).json({ error: "No access token provided" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      user_id: number;
    };
    req.user = { user_id: decoded.user_id };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired access token" });
  }
};

// Generate Tokens
function generateAccessToken(user_id: number) {
  return jwt.sign({ user_id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user_id: number) {
  return jwt.sign({ user_id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// Register
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, first_name, last_name, date_of_birth } =
    req.body;

  if (!username || !email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT 1 FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userResult = await pool.query(
      `INSERT INTO users (username, email, password, first_name, last_name, date_of_birth) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        username,
        email,
        hashedPassword,
        first_name,
        last_name,
        date_of_birth || null,
      ]
    );
    const newUser: User = userResult.rows[0];

    // Initialize Impact Tokens
    await pool.query("INSERT INTO user_tokens (user_id) VALUES ($1)", [
      newUser.user_id,
    ]);

    const accessToken = generateAccessToken(newUser.user_id);
    const refreshToken = generateRefreshToken(newUser.user_id);

    // Store refresh token
    await pool.query("UPDATE users SET refresh_token = $1 WHERE user_id = $2", [
      refreshToken,
      newUser.user_id,
    ]);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Set to false for local testing (no HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        accessToken,
        user: {
          user_id: newUser.user_id,
          username: newUser.username,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          date_of_birth: newUser.date_of_birth,
          created_at: newUser.created_at,
          follower_count: newUser.follower_count || 0,
          following_count: newUser.following_count || 0,
        },
      });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user: User = userResult.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);

    await pool.query("UPDATE users SET refresh_token = $1 WHERE user_id = $2", [
      refreshToken,
      user.user_id,
    ]);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Set to false for local testing
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          date_of_birth: user.date_of_birth,
          created_at: user.created_at,
          follower_count: user.follower_count || 0,
          following_count: user.following_count || 0,
        },
      });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Refresh Token
router.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    // Verify refresh token
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      user_id: number;
    };

    // Check refresh token in database
    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_id = $1 AND refresh_token = $2",
      [payload.user_id, refreshToken]
    );
    if (userResult.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }

    const newAccessToken = generateAccessToken(payload.user_id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// Get user's Impact Tokens
router.get("/tokens", authMiddleware, async (req: Request, res: Response) => {
  const user_id = req.user?.user_id;

  try {
    const tokenResult = await pool.query(
      "SELECT * FROM user_tokens WHERE user_id = $1",
      [user_id]
    );
    if (tokenResult.rows.length === 0) {
      return res.status(404).json({ error: "Tokens not found" });
    }
    const tokens: UserToken = tokenResult.rows[0];
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

const env = 'PROD';

const environment = {
  prod: {
    baseurl: 'https://flowit-platform.fly.dev/api',
  },
  dev: {
    baseurla: 'https://flowit-platform-2.fly.dev/api',
  },
};

function defineEnvContext() {
  console.log('environment configured: ' + env);
  if (env == 'PROD') {
    return {
      environment: environment.prod,
    };
  } else {
    return {
      environment: environment.dev,
    };
  }
}
export const envContext = defineEnvContext();

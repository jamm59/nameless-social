// components/FeedItem.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Repeat2, Eye } from 'lucide-react-native';

type Props = {
  username: string;
  handle?: string;
  text: string;
  likes: number;
  comments?: number;
  reposts?: number;
  views?: string | number;
  time?: string;
  image?: string | null;
  liked?: boolean;
};

export default function FeedItem({
  username,
  handle = '@username',
  text,
  likes,
  comments = 0,
  reposts = 0,
  views = 0,
  time = '2 hours',
  image,
  liked = false,
}: Props) {
  return (
    <View className="mx-4 mb-3 flex-1 gap-3 overflow-hidden border-b border-gray-700 pb-2">
      <View className="flex-row items-center gap-2 space-x-3">
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="h-10 w-10 rounded-full" />
        <View>
          <Text className="font-bold text-white">{username}</Text>
          <Text className="text-xs text-gray-400">@sajon.co . {time} ago</Text>
        </View>
      </View>

      <View className="my-2 rounded-2xl bg-white p-3">
        <Text className="text-[15px] leading-5 text-black">{text}</Text>
      </View>

      {image && (
        <Image source={{ uri: image }} className="mt-2 h-64 w-full rounded-xl" resizeMode="cover" />
      )}

      <View className="mt-3 flex-row items-center justify-between rounded-md p-2">
        <TouchableOpacity className="flex-row items-center gap-2 space-x-1">
          <Heart
            color={liked ? '#EF4444' : '#9CA3AF'}
            fill={liked ? '#EF4444' : 'none'}
            size={20}
          />
          <Text className={`text-sm ${liked ? 'text-red-400' : 'text-gray-400'}`}>
            {likes} likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2 space-x-1">
          <MessageCircle color="#9CA3AF" size={20} />
          <Text className="text-sm text-gray-400">{comments} comments</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 space-x-1">
          <Repeat2 color="#9CA3AF" size={20} />
          <Text className="text-sm text-gray-400">{reposts} reposts</Text>
        </TouchableOpacity>

        {/* <View className="flex-row items-center space-x-1">
          <Eye color="#9CA3AF" size={20} />
          <Text className="text-sm text-gray-400">{views}</Text>
        </View> */}
      </View>
    </View>
  );
}

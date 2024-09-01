// components/Tweet.tsx

import React from 'react';
import { Post } from '../lib/types';
import moment from 'moment';

interface TweetProps {
  post: Post;
}

const Tweet: React.FC<TweetProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {post.user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-white font-semibold">
            {post.user.username}
          </h3>
          <p className="text-gray-400 text-sm">
            @{post.user.username} · {moment(post.timestamp).fromNow()}
          </p>
        </div>
      </div>
      <p className="mt-2 text-gray-300">{post.content}</p>
    </div>
  );
};

export default Tweet;

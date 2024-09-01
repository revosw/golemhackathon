// components/Timeline.tsx

import React from 'react';
import { Post } from '../lib/types';
import Tweet from './Tweet';

interface TimelineProps {
  posts: Post[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No tweets to display.</p>
      )}
      {posts.map((post) => (
        <Tweet key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;

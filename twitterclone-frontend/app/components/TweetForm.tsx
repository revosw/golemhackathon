// components/TweetForm.tsx

import React, { useState } from 'react';

interface TweetFormProps {
  onTweet: (content: string) => void;
}

const TweetForm: React.FC<TweetFormProps> = ({ onTweet }) => {
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onTweet(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tweet
      </button>
    </form>
  );
};

export default TweetForm;

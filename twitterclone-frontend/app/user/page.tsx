'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Tweet from '../../components/Tweet';
import TweetForm from '../../components/TweetForm';
import Timeline from '../../components/Timeline';
import { Post, User } from '../../lib/types';
import { getUserPosts, getFollowingPosts, logoutUser } from '../../lib/api';

const UserPage: React.FC = () => {
  const router = useRouter();
  const [timelineType, setTimelineType] = useState<'user' | 'following'>('user');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [followingPosts, setFollowingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user posts
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const posts = await getUserPosts();
      setUserPosts(posts);
    } catch (err) {
      setError('Failed to load user posts.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch following posts
  const fetchFollowingPosts = async () => {
    try {
      setLoading(true);
      const posts = await getFollowingPosts();
      setFollowingPosts(posts);
    } catch (err) {
      setError('Failed to load following posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timelineType === 'user') {
      fetchUserPosts();
    } else {
      fetchFollowingPosts();
    }
  }, [timelineType]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/Login');
    } catch (err) {
      setError('Failed to logout.');
    }
  };

  // Handle new tweet
  const handleNewTweet = async (content: string) => {
    try {
      await fetchUserPosts();
      if (timelineType === 'user') {
        fetchUserPosts();
      }
      // Optionally, you can also refresh following posts if necessary
    } catch (err) {
      setError('Failed to post tweet.');
    }
  };

  return (
    <Layout>
      <Navbar onLogout={handleLogout} />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, @{/* Insert Username Here */}</h1>
        <TweetForm onTweet={handleNewTweet} />
        <div className="flex space-x-4 my-4">
          <button
            className={`px-4 py-2 rounded ${
              timelineType === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimelineType('user')}
          >
            Your Tweets
          </button>
          <button
            className={`px-4 py-2 rounded ${
              timelineType === 'following'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimelineType('following')}
          >
            Following
          </button>
        </div>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <Timeline
            posts={timelineType === 'user' ? userPosts : followingPosts}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserPage;

// lib/api.ts

import { Post } from './types';

// Mock API functions. Replace these with actual API calls.

export const getUserPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/user/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  return response.json();
};

export const getFollowingPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/user/following/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch following posts');
  }
  return response.json();
};

export const logoutUser = async (): Promise<void> => {
  const response = await fetch('/api/logout', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to logout');
  }
};

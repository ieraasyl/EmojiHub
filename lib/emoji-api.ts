import axios from 'axios';
import { Emoji } from './types';
import { unstable_cache } from 'next/cache';

const EMOJI_API_URL = process.env.EMOJI_API_URL!;

// Cached fetch function (10 minutes)
export const fetchEmojis = unstable_cache(
  async (): Promise<Emoji[]> => {
    try {
      const response = await axios.get(EMOJI_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching emojis:', error);
      throw new Error('Failed to fetch emojis');
    }
  },
  ['emojis'],
  {
    revalidate: 600, // 10 minutes
    tags: ['emojis'],
  }
);

export const getEmojiByName = async (name: string): Promise<Emoji | null> => {
  const emojis = await fetchEmojis();
  return emojis.find((e) => e.name === name) || null;
};

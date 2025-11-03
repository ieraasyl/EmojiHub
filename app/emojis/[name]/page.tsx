import { notFound } from 'next/navigation';
import { getEmojiByName } from '@/lib/emoji-api';
import EmojiDetailClient from './EmojiDetailClient';
import { Container } from '@mui/material';

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const emoji = await getEmojiByName(decodeURIComponent(name));

  if (!emoji) {
    return {
      title: 'Emoji Not Found',
    };
  }

  return {
    title: `${emoji.name.replace(/-/g, ' ')} - Emoji Hub`,
    description: `Explore the ${emoji.name.replace(/-/g, ' ')} emoji from the ${emoji.category} category`,
  };
}

export default async function EmojiDetailPage({ params }: PageProps) {
  const { name } = await params;
  const emoji = await getEmojiByName(decodeURIComponent(name));

  if (!emoji) {
    notFound();
  }

  return (
    <Container>
      <EmojiDetailClient emoji={emoji} />
    </Container>
  );
}

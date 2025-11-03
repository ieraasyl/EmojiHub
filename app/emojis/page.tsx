import { fetchEmojis } from '@/lib/emoji-api';
import EmojiList from '@/components/EmojiList';
import { Container } from '@mui/material';

export const revalidate = 600; // Revalidate every 10 minutes

export default async function EmojisPage() {
  const emojis = await fetchEmojis();

  return (
    <Container>
      <EmojiList initialEmojis={emojis} />
    </Container>
  );
}

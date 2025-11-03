import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateEmojiDescription(
  emojiHtml: string
): Promise<string> {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not configured');
      throw new Error('Gemini API key not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Decode HTML entity to actual emoji for better AI understanding
    const tempDiv = typeof document !== 'undefined' 
      ? document.createElement('div')
      : null;
    
    let actualEmoji = emojiHtml;
    if (tempDiv) {
      tempDiv.innerHTML = emojiHtml;
      actualEmoji = tempDiv.textContent || emojiHtml;
    }

    const prompt = `You are a creative emoji description writer. Generate a unique, short, and expressive mood description for this specific emoji: ${actualEmoji} (HTML: ${emojiHtml})

Requirements:
- Create a UNIQUE description that captures THIS SPECIFIC emoji's meaning and mood
- Keep it under 70 characters
- Make it friendly and expressive
- Include 1-2 relevant emojis that complement the main emoji
- DO NOT use generic phrases like "Express yourself"
- Make each description distinctly different based on the emoji's actual meaning

Example formats:
- For 😊: "Pure happiness and warmth! 💛✨"
- For 🎉: "Celebrate the moment! 🥳🎊"
- For 😢: "It's okay to feel sad 💙🌧️"

Now generate a unique description for: ${actualEmoji}`;

    console.log(`Generating description for emoji: ${actualEmoji} (${emojiHtml})`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(`Generated description: ${text}`);
    return text.trim();
  } catch (error) {
    console.error('Error generating description:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return 'Express yourself! ✨';
  }
}

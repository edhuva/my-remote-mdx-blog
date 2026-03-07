export default function getReadingTime(text: string): string {
  const wordsPerMinute = 200

  const numberOfWords = text.trim().split(/\s+/).length
  const minutes = Math.ceil(numberOfWords / wordsPerMinute)

  return `${minutes} min read`
}
export default function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-ZA', { dateStyle: 'long' }).format(new Date(dateString))
}

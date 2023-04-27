import { parseISO, format } from 'date-fns';
//formatting the date for posts 
export default function Date({ dateString }) {
  if (!dateString) return null;
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'MM/dd/yyyy')}</time>;
}
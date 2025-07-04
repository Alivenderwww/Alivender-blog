import { parseISO, format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy年MMMd日, EEEE', { locale: zhCN })}</time>;
}
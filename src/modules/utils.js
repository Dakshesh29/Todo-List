import { format } from 'date-fns';

export function formatDate(dateStr) {
  try {
    return format(new Date(dateStr), 'PP');
  } catch {
    return dateStr;
  }
}

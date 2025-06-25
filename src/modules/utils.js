import { format, parseISO } from 'date-fns';

export function formatDate(isoString) {
  return format(parseISO(isoString), 'PPP');
}

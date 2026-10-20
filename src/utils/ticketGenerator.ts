/**
 * Generates unique formatted tracking code for public services or complaints
 */
export function generateTicketCode(prefix: 'ADM' | 'ADU'): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `GML-${prefix}-${year}-${randomNum}`;
}

/**
 * Calculates SLA estimated date excluding weekends
 */
export function calculateSLADate(startDate: Date, workingDays: number): string {
  const result = new Date(startDate);
  let addedDays = 0;
  
  while (addedDays < workingDays) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  const yyyy = result.getFullYear();
  const mm = String(result.getMonth() + 1).padStart(2, '0');
  const dd = String(result.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Format date into Indonesian locale string
 */
export function formatIndonesianDate(dateString: string): string {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Fixes and validates a MongoDB connection URL.
 * 
 * @param {string} url - The MongoDB connection URL to validate and fix.
 * @returns {Object} - An object containing:
 *   - {number} status: HTTP-like status code (200, 400, 401).
 *   - {string} url (optional): The corrected URL if validation succeeds.
 *   - {string} message: A message describing the result.
 * owner:
 * @PikaBotz
 */
export const mongoURIFix = (url) => {
  if (url.includes('<password>')) {
    return { status: 401, message: 'Password not entered!' };
  }
  const nonApplicationDriverPattern = /^mongodb\+srv:\/\/[^\s@]+:[^\s@]+@[^\s@]+\.[^\s@]+\.mongodb\.net\/?.*$/;
  if (!nonApplicationDriverPattern.test(url)) {
    return { status: 400, message: 'Invalid application driver URL.' };
  }
  const matchPassword = /mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/]+)(\/?.*)$/;
  const match = url.match(matchPassword);
  if (match && match[2].includes('<') && match[2].includes('>')) {
    url = url.replace(match[2], match[2].replace(/<|>/g, ''));
  }
  const baseUrl = url.split('/')[0];
  const correctedUrl = `${baseUrl}/anya_gen3_db?retryWrites=true&w=majority`;
  return { status: 200, url: correctedUrl, message: 'URL corrected successfully.' };
};

import DOMPurify from 'dompurify';

export const sanitizeText = (text) => {
  return DOMPurify.sanitize(text);
};
// Cloudflare Pages Functions middleware to enable Node.js compatibility
export const onRequest: PagesFunction = async (context) => {
  return await context.next();
};

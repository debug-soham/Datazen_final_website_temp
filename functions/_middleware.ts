// Cloudflare Pages Functions middleware to enable Node.js compatibility
export const onRequest: PagesFunction = async (context) => {
  return await context.next();
};

// Enable Node.js compatibility for all functions
export const config = {
  runtime: {
    compatibility_flags: ['nodejs_compat'],
    compatibility_date: '2024-01-01',
  },
};

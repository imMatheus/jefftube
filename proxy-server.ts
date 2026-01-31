const ASSETS_BASE_URL = 'https://assets.kino.ai';

// CloudFront signed cookies from your authenticated session
const CLOUDFRONT_COOKIES = {
  'CloudFront-Key-Pair-Id': 'K182I3C1SFIQ8J',
  'CloudFront-Signature': 'qeAOV1f5oBjUwMcuiXVNny-Pp9n-aSpoJvwR2Mfm8jMLCHqnllBd0fi8mw5PpcwbvRcZDQNoeFZ9f2uuHzK0R7FnWJaXnb4FqnKiDaMqoPU~zbW0UhKi8WztTiPGbSfjxhnXJj-U2bquqEQOIor13pB3gNF6HLjgJZwjKBqn3jlnEAZJCzdLsI83gldBBdJ6D1yJcQyZRoxZvtr3LEGrlGFTXJVrA94EVbtwAxdUv5j7D6PAKAsQOzwOhPvOqbp~AvTxR18cBEv94u1tDAPbi0DaP9E5lT7Ih4hzymsABfKUZyYF2MH607TIYxq5O6QHSCJdguuKIBzkFouj04G01g__',
  'CloudFront-Policy': 'eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9hc3NldHMua2luby5haS9vcmdfMzdEVGNFOXJJQXVWNXR4ZllRemtNY0pYS2JKLyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE4MDEzNzg3NDJ9fX1dfQ__',
};

const cookieString = Object.entries(CLOUDFRONT_COOKIES)
  .map(([key, value]) => `${key}=${value}`)
  .join('; ');

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    // Proxy requests to assets.kino.ai
    const assetPath = url.pathname;
    const assetUrl = `${ASSETS_BASE_URL}${assetPath}`;

    try {
      const response = await fetch(assetUrl, {
        headers: {
          'Cookie': cookieString,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        },
      });

      if (!response.ok) {
        return new Response(`Failed to fetch: ${response.status}`, {
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const body = await response.arrayBuffer();

      return new Response(body, {
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response('Proxy error', {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
});

console.log(`🖼️  Image proxy server running at http://localhost:${server.port}`);

/**
 * WaywardHouse API Worker — the only server-side code on wayward.house.
 *
 * Bound to the route wayward.house/api/* (see ../wrangler.toml), so it runs
 * only for API calls. Every page, asset and book is static on GitHub Pages
 * and never touches this Worker.
 *
 *   POST /api/ask          Pepper (Workers AI + Vectorize)
 *   POST /api/subscribe    double opt-in signup (D1 + Resend)
 *   GET  /api/confirm      confirm link from the signup email
 *   GET  /api/unsubscribe  unsubscribe link from email footers
 */

import { handleAsk } from './ask.js';
import { handleSubscribe, handleConfirm, handleUnsubscribe, corsHeaders, jsonResponse } from './subscribers.js';

const ROUTES = {
  'POST /api/ask':         handleAsk,
  'POST /api/subscribe':   handleSubscribe,
  'GET /api/confirm':      handleConfirm,
  'GET /api/unsubscribe':  handleUnsubscribe,
};

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const path = pathname.replace(/\/+$/, '');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    const handler = ROUTES[`${request.method} ${path}`];
    if (!handler) return jsonResponse({ error: 'Not found.' }, 404, env);

    return handler(request, env);
  },
};

/**
 * Simple sliding-window in-memory rate limiter.
 * Works per-IP. Suitable for single-instance / dev usage.
 * For Vercel multi-instance production, swap the Map for Upstash Redis.
 */

interface Window {
    count: number;
    resetAt: number; // epoch ms
}

const store = new Map<string, Window>();

/** Clean expired entries every 2 minutes to avoid memory leak */
setInterval(() => {
    const now = Date.now();
    for (const [key, win] of store) {
        if (now > win.resetAt) store.delete(key);
    }
}, 2 * 60 * 1000);

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetInSeconds: number;
}

/**
 * @param ip        - Client IP string
 * @param limit     - Max requests per window (default 10)
 * @param windowMs  - Window length in ms (default 60 000 = 1 min)
 */
export function rateLimit(
    ip: string,
    limit = 10,
    windowMs = 60_000
): RateLimitResult {
    const now = Date.now();
    let win = store.get(ip);

    if (!win || now > win.resetAt) {
        win = { count: 0, resetAt: now + windowMs };
        store.set(ip, win);
    }

    win.count += 1;

    const remaining = Math.max(0, limit - win.count);
    const resetInSeconds = Math.ceil((win.resetAt - now) / 1000);
    const allowed = win.count <= limit;

    return { allowed, remaining, resetInSeconds };
}

import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimiter = new Map<string, RateLimitRecord>();

export function rateLimit(
  req: NextRequest, 
  options: { limit?: number; windowMs?: number } = {}
) {
  const { limit = 10, windowMs = 60 * 1000 } = options; // 10 requests per minute default
  
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
  const now = Date.now();
  
  // Clean up expired entries
  for (const [key, record] of rateLimiter.entries()) {
    if (now > record.resetTime) {
      rateLimiter.delete(key);
    }
  }
  
  const record = rateLimiter.get(ip);
  
  if (!record) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true, remaining: limit - 1 };
  }
  
  if (record.count >= limit) {
    return { 
      success: false, 
      remaining: 0,
      resetTime: record.resetTime 
    };
  }
  
  record.count++;
  return { success: true, remaining: limit - record.count };
}
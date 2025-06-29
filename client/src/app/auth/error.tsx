'use client';

export default function AuthError({ error }: { error: Error }) {
  return <div>Auth Error: {error.message}</div>;
} 
'use client';

import { useState } from 'react';
import BeatPlayer from '@/components/BeatPlayer';

export default function Home() {
  const [theme, setTheme] = useState('');
  const [mood, setMood] = useState('');
  const [starter, setStarter] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLyrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, mood, starter }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to generate lyrics');
      }
      
      const data = await res.json();
      setLyrics(data.lyrics);
    } catch (error) {
      console.error('Error generating lyrics:', error);
      setLyrics('Failed to generate lyrics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-black text-white font-mono">
      <h1 className="text-4xl font-bold mb-6">🎤 RhymeSmith</h1>
      <div className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Theme (e.g. heartbreak, hustle)"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">Select Mood</option>
          <option value="hype">Hype</option>
          <option value="sad">Sad</option>
          <option value="chill">Chill</option>
          <option value="deep">Deep</option>
        </select>
        <input
          type="text"
          placeholder="Starter line (optional)"
          value={starter}
          onChange={(e) => setStarter(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
        <button
          onClick={generateLyrics}
          className="bg-blue-600 p-2 rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? 'Spitting bars...' : 'Generate Lyrics'}
        </button>
      </div>

      {lyrics && (
        <div className="mt-6 bg-gray-900 p-4 rounded shadow-md">
          <h2 className="text-2xl mb-2">📝 Your Verse</h2>
          <pre className="whitespace-pre-wrap text-lg text-green-400">{lyrics}</pre>
        </div>
      )}

      <BeatPlayer />
    </main>
  );
}

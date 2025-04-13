'use client';

import { useState } from 'react';
import * as Tone from 'tone';

const BeatPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  let loop = null;

  const startBeat = async () => {
    await Tone.start();
    const synth = new Tone.MembraneSynth().toDestination();

    loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C2", "8n", time);
    }, "4n");

    loop.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopBeat = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="mt-4">
      {!isPlaying ? (
        <button onClick={startBeat} className="px-4 py-2 bg-green-500 rounded text-black">Play Beat</button>
      ) : (
        <button onClick={stopBeat} className="px-4 py-2 bg-red-500 rounded text-white">Stop Beat</button>
      )}
    </div>
  );
};

export default BeatPlayer;

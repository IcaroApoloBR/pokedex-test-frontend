import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';

function PlayerMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    function togglePlayingMusic() {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <div>
            <audio ref={audioRef} src="/openingPokemon.mp3" />
            <button onClick={togglePlayingMusic} className="fixed bottom-12 left-7 z-50 cursor-pointer p-4 hover:animate-pulse">
                {isPlaying ?
                    <Icon icon="svg-spinners:bars-scale-middle" width="32" color="#CC0000" />
                    :
                    <Icon icon="tabler:antenna-bars-off" width="32" color="#CC0000" />
                }
            </button>
        </div>
    );
}

export default PlayerMusic;
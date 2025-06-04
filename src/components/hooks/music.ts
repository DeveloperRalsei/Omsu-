"use client";

import { useState, useRef, useEffect } from "react";

export const useMusic = (url: string, lazy = false) => {
    const [loading, setLoading] = useState(!lazy);
    const [error, setError] = useState<Error | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const init = () => {
        if (audioRef.current) return;

        const audio = new Audio(url);
        audioRef.current = audio;

        setLoading(true);
        setError(null);
        setPlaying(false);

        const handleCanPlay = () => setLoading(false);
        const handleError = () => {
            setError(new Error("Failed to load audio."));
            setLoading(false);
        };
        const handleTimeUpdate = () => {
            if (audio.duration > 0) {
                setProgress(audio.currentTime / audio.duration);
            }
        };
        const handleEnded = () => {
            setPlaying(false);
            setProgress(1);
        };

        audio.addEventListener("canplaythrough", handleCanPlay);
        audio.addEventListener("error", handleError);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        audio.volume = 0.4;
        audio.load();
    };

    const play = () => {
        init();
        audioRef.current?.play();
        setPlaying(true);
    };

    const pause = () => {
        audioRef.current?.pause();
        setPlaying(false);
    };

    useEffect(() => {
        return () => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.pause();
            audio.src = "";
            audio.remove();
        };
    }, []);

    return {
        audio: audioRef,
        loading,
        error,
        playing,
        progress,
        play,
        pause,
        init,
    };
};

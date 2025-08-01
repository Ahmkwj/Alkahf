import { useState, useRef, useCallback, useEffect } from 'react';
import { getAudioUrlForVerse } from '../services/quranApi';

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentVerse: number | null;
  error: string | null;
  progress: number;
  duration: number;
}

export interface AudioControls {
  playVerse: (verseNumber: number) => Promise<void>;
  pauseAudio: () => void;
  stopAudio: () => void;
  togglePlayPause: (verseNumber: number) => Promise<void>;
}

export const useAudioPlayer = () => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentVerse: null,
    error: null,
    progress: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressTracking = useCallback(() => {
    clearProgressInterval();
    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (!isNaN(currentTime) && !isNaN(duration)) {
          setAudioState(prev => ({
            ...prev,
            progress: currentTime,
            duration: duration,
          }));
        }
      }
    }, 100);
  }, [clearProgressInterval]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }
    clearProgressInterval();
    setAudioState({
      isPlaying: false,
      isLoading: false,
      currentVerse: null,
      error: null,
      progress: 0,
      duration: 0,
    });
  }, [clearProgressInterval]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    clearProgressInterval();
    setAudioState(prev => ({
      ...prev,
      isPlaying: false,
    }));
  }, [clearProgressInterval]);

  const playVerse = useCallback(async (verseNumber: number) => {
    try {
      if (audioState.currentVerse === verseNumber && audioRef.current && !audioRef.current.paused) {
        return;
      }

      stopAudio();

      setAudioState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        currentVerse: verseNumber,
      }));

      const audioUrl = await getAudioUrlForVerse(verseNumber);
      if (!audioUrl) {
        throw new Error('Audio not available for this verse');
      }

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;

      const handleLoadStart = () => {
        setAudioState(prev => ({ ...prev, isLoading: true }));
      };

      const handleCanPlay = () => {
        setAudioState(prev => ({
          ...prev,
          isLoading: false,
          duration: audio.duration || 0,
        }));
      };

      const handlePlay = () => {
        setAudioState(prev => ({ ...prev, isPlaying: true }));
        startProgressTracking();
      };

      const handlePause = () => {
        setAudioState(prev => ({ ...prev, isPlaying: false }));
        clearProgressInterval();
      };

      const handleEnded = () => {
        setAudioState(prev => ({
          ...prev,
          isPlaying: false,
          progress: 0,
        }));
        clearProgressInterval();
      };

      const handleError = () => {
        setAudioState(prev => ({
          ...prev,
          isPlaying: false,
          isLoading: false,
          error: 'Failed to load audio. Please try again.',
        }));
        clearProgressInterval();
      };

      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);

      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      audio.src = audioUrl;
      audio.load();
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((_error) => {
          setAudioState(prev => ({
            ...prev,
            isPlaying: false,
            isLoading: false,
            error: 'Failed to play audio. Please try again.',
          }));
        });
      }

    } catch (error) {
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to play audio',
      }));
    }
  }, [audioState.currentVerse, stopAudio, startProgressTracking, clearProgressInterval]);

  const togglePlayPause = useCallback(async (verseNumber: number) => {
    if (audioState.currentVerse === verseNumber) {
      if (audioState.isPlaying) {
        pauseAudio();
      } else {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    } else {
      await playVerse(verseNumber);
    }
  }, [audioState.currentVerse, audioState.isPlaying, pauseAudio, playVerse]);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadstart', () => {});
        audioRef.current.removeEventListener('canplay', () => {});
        audioRef.current.removeEventListener('play', () => {});
        audioRef.current.removeEventListener('pause', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current = null;
      }
    };
  }, [stopAudio]);

  return {
    audioState,
    audioControls: {
      playVerse,
      pauseAudio,
      stopAudio,
      togglePlayPause,
    } as AudioControls,
  };
};
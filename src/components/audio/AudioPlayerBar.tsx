import { useCallback } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { SpeedSelector } from './SpeedSelector';
import { SleepTimer } from './SleepTimer';
import type { PlaybackSpeed } from '@/types/audio';
import { cn } from '@/lib/utils';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSkip: (seconds: number) => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  onStop: () => void;
}

export function AudioPlayerBar({
  isPlaying,
  isLoading,
  currentTime,
  duration,
  playbackRate,
  onTogglePlay,
  onSeek,
  onSkip,
  onSpeedChange,
  onStop,
}: AudioPlayerBarProps) {
  const formatTime = useCallback((seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSliderChange = useCallback(
    (value: number[]) => {
      const newTime = (value[0] / 100) * duration;
      onSeek(newTime);
    },
    [duration, onSeek]
  );

  return (
    <div className="bg-card/95 backdrop-blur-lg rounded-2xl p-3 shadow-card border border-border">
      {/* Progress bar */}
      <div className="mb-3">
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={0.1}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <SleepTimer onTimerEnd={onStop} isPlaying={isPlaying} />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => onSkip(-15)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={onTogglePlay}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => onSkip(15)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <SpeedSelector
          currentSpeed={playbackRate}
          onSpeedChange={onSpeedChange}
        />
      </div>
    </div>
  );
}

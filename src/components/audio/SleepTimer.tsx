import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepTimerProps {
  onTimerEnd: () => void;
  isPlaying: boolean;
}

type TimerOption = {
  label: string;
  minutes: number;
};

const timerOptions: TimerOption[] = [
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
  { label: '1 hora', minutes: 60 },
];

export function SleepTimer({ onTimerEnd, isPlaying }: SleepTimerProps) {
  const [open, setOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  const isActive = remainingSeconds !== null;

  // Timer countdown
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 0) {
          onTimerEnd();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPlaying, onTimerEnd]);

  const startTimer = useCallback((minutes: number) => {
    setRemainingSeconds(minutes * 60);
    setOpen(false);
  }, []);

  const cancelTimer = useCallback(() => {
    setRemainingSeconds(null);
    setOpen(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 px-2 text-xs font-medium gap-1',
            isActive && 'text-accent'
          )}
        >
          <Moon className="h-4 w-4" />
          {isActive && <span>{formatTime(remainingSeconds)}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-1" align="center">
        <div className="flex flex-col gap-0.5">
          {timerOptions.map((option) => (
            <Button
              key={option.minutes}
              variant="ghost"
              size="sm"
              className="justify-center h-8"
              onClick={() => startTimer(option.minutes)}
            >
              {option.label}
            </Button>
          ))}
          {isActive && (
            <Button
              variant="ghost"
              size="sm"
              className="justify-center h-8 text-destructive"
              onClick={cancelTimer}
            >
              Cancelar
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

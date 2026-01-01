import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Gauge } from 'lucide-react';
import type { PlaybackSpeed } from '@/types/audio';
import { cn } from '@/lib/utils';

interface SpeedSelectorProps {
  currentSpeed: number;
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

const speeds: PlaybackSpeed[] = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function SpeedSelector({ currentSpeed, onSpeedChange }: SpeedSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSpeedSelect = (speed: PlaybackSpeed) => {
    onSpeedChange(speed);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs font-medium"
        >
          {currentSpeed === 1 ? <Gauge className="h-4 w-4" /> : `${currentSpeed}x`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1" align="center">
        <div className="flex flex-col gap-0.5">
          {speeds.map((speed) => (
            <Button
              key={speed}
              variant="ghost"
              size="sm"
              className={cn(
                'justify-center h-8',
                currentSpeed === speed && 'bg-accent/20 text-accent-foreground'
              )}
              onClick={() => handleSpeedSelect(speed)}
            >
              {speed}x
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

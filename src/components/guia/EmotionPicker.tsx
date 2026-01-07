import { useNavigate } from 'react-router-dom';
import { AlertCircle, Heart, CloudRain, Flame, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const emotions = [
  {
    id: 'ansiedad',
    label: 'Ansioso',
    icon: AlertCircle,
    color: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
    iconColor: 'text-amber-500',
  },
  {
    id: 'tristeza',
    label: 'Triste',
    icon: CloudRain,
    color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 'enojo',
    label: 'Enojado',
    icon: Flame,
    color: 'bg-red-500/10 text-red-600 hover:bg-red-500/20',
    iconColor: 'text-red-500',
  },
  {
    id: 'paz',
    label: 'En paz',
    icon: Heart,
    color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
    iconColor: 'text-green-500',
  },
  {
    id: 'gratitud',
    label: 'Agradecido',
    icon: Sun,
    color: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20',
    iconColor: 'text-yellow-500',
  },
];

export const EmotionPicker = () => {
  const navigate = useNavigate();

  const handleSelect = (emotionId: string) => {
    navigate(`/guia/${emotionId}`);
  };

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        ¿Cómo te sientes hoy?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => handleSelect(emotion.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/50 transition-all duration-200',
              emotion.color
            )}
          >
            <emotion.icon className={cn('h-8 w-8', emotion.iconColor)} />
            <span className="text-sm font-medium">{emotion.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

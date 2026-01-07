import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Compass, Sparkles, ShieldCheck, Shield, Sunrise } from 'lucide-react';
import { cn } from '@/lib/utils';

const spiritualNeeds = [
  {
    id: 'perdon',
    label: 'Perdón',
    icon: HeartHandshake,
  },
  {
    id: 'direccion',
    label: 'Dirección',
    icon: Compass,
  },
  {
    id: 'fe',
    label: 'Fe',
    icon: Sparkles,
  },
  {
    id: 'proteccion',
    label: 'Protección',
    icon: ShieldCheck,
  },
  {
    id: 'fortaleza',
    label: 'Fortaleza',
    icon: Shield,
  },
  {
    id: 'esperanza',
    label: 'Esperanza',
    icon: Sunrise,
  },
];

export const SpiritualNeeds = () => {
  const navigate = useNavigate();

  const handleSelect = (needId: string) => {
    navigate(`/guia/${needId}`);
  };

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Necesidades espirituales
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {spiritualNeeds.map((need) => (
          <button
            key={need.id}
            onClick={() => handleSelect(need.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-4 rounded-xl',
              'bg-secondary hover:bg-secondary/80 transition-all duration-200',
              'border border-border/50 hover:border-primary/30'
            )}
          >
            <need.icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{need.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

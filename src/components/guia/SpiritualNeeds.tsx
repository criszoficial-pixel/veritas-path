import { useNavigate } from 'react-router-dom';
import { HeartHandshake, Compass, Sparkles, ShieldCheck, Shield, Sunrise, Siren } from 'lucide-react';
import { cn } from '@/lib/utils';

const spiritualNeeds = [
  {
    id: 'perdon',
    label: 'Perdón',
    description: 'Libérate del rencor',
    icon: HeartHandshake,
  },
  {
    id: 'direccion',
    label: 'Dirección',
    description: 'Encuentra tu camino',
    icon: Compass,
  },
  {
    id: 'fe',
    label: 'Fe',
    description: 'Fortalece tu confianza',
    icon: Sparkles,
  },
  {
    id: 'proteccion',
    label: 'Protección',
    description: 'Refugio en Dios',
    icon: ShieldCheck,
  },
  {
    id: 'fortaleza',
    label: 'Fortaleza',
    description: 'Fuerza para seguir',
    icon: Shield,
  },
  {
    id: 'esperanza',
    label: 'Esperanza',
    description: 'Un nuevo amanecer',
    icon: Sunrise,
  },
  {
    id: 'tentacion',
    label: 'Tentación',
    description: 'Vence la tentación',
    icon: Siren,
  },
];

export const SpiritualNeeds = () => {
  const navigate = useNavigate();

  const handleSelect = (needId: string) => {
    navigate(`/guia/${needId}`);
  };

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Necesidades espirituales
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Profundiza en aspectos fundamentales de tu vida espiritual con versículos seleccionados.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {spiritualNeeds.map((need) => (
          <button
            key={need.id}
            onClick={() => handleSelect(need.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl',
              'bg-secondary hover:bg-secondary/80 transition-all duration-200',
              'border border-border/50 hover:border-primary/30'
            )}
          >
            <need.icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{need.label}</span>
            <span className="text-xs text-muted-foreground text-center">{need.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const situations = [
  {
    id: 'perdida',
    label: 'Pérdida o duelo',
    description: 'Consuelo para tiempos difíciles',
    image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=400&q=80',
  },
  {
    id: 'trabajo',
    label: 'Problemas en el trabajo',
    description: 'Guía para tu vida laboral',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80',
  },
  {
    id: 'conflictos',
    label: 'Conflictos con otros',
    description: 'Sabiduría para las relaciones',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
  },
  {
    id: 'enfermedad',
    label: 'Enfermedad',
    description: 'Esperanza y sanidad',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
  },
];

export const SituationList = () => {
  const navigate = useNavigate();

  const handleSelect = (situationId: string) => {
    navigate(`/guia/${situationId}`);
  };

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        ¿Qué situación atraviesas?
      </h2>
      <div className="space-y-3">
        {situations.map((situation) => (
          <button
            key={situation.id}
            onClick={() => handleSelect(situation.id)}
            className="w-full flex items-center gap-4 p-3 rounded-xl bg-card border border-border/50 hover:shadow-soft hover:border-primary/30 transition-all duration-200"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={situation.image}
                alt={situation.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-foreground">{situation.label}</h3>
              <p className="text-sm text-muted-foreground">{situation.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>
    </section>
  );
};

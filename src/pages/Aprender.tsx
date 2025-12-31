import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Map, BookOpen, Clock, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const learningPaths = [
  {
    id: 1,
    title: 'Fundamentos de la Fe',
    level: 'Principiante',
    stages: 12,
    completedStages: 3,
    duration: '3 meses',
    description: 'Conoce los conceptos básicos y personajes clave de la Biblia.',
    color: 'bg-spirit/10 border-spirit/30',
    iconColor: 'bg-spirit',
  },
  {
    id: 2,
    title: 'Profundizando en la Historia',
    level: 'Intermedio',
    stages: 24,
    completedStages: 0,
    duration: '6 meses',
    description: 'Explora las conexiones entre eventos y el contexto histórico.',
    color: 'bg-primary/10 border-primary/30',
    iconColor: 'bg-primary',
    locked: true,
  },
  {
    id: 3,
    title: 'La Gran Narrativa',
    level: 'Avanzado',
    stages: 52,
    completedStages: 0,
    duration: '1 año',
    description: 'Estudio exhaustivo de toda la Biblia.',
    color: 'bg-accent/10 border-accent/30',
    iconColor: 'bg-accent',
    locked: true,
  },
];

const currentStage = {
  title: 'Etapa 4: Moisés y el Éxodo',
  readings: 'Éxodo 3, 12, 14, 20',
  progress: 65,
};

const Aprender = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Rutas de Aprendizaje" />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Current Progress Card */}
        <section className="rounded-2xl divine-gradient p-6 text-primary-foreground">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm font-medium opacity-80">Ruta Activa</span>
              <h3 className="text-xl font-bold mt-1">Fundamentos de la Fe</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Map className="h-6 w-6" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-80 mb-1">{currentStage.title}</p>
              <p className="text-xs opacity-60">Lecturas: {currentStage.readings}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso de etapa</span>
                <span>{currentStage.progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${currentStage.progress}%` }}
                />
              </div>
            </div>
            
            <Button variant="secondary" className="w-full mt-4">
              Continuar Aprendiendo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* All Learning Paths */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Explorar Rutas</h2>
          
          <div className="space-y-3">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className={cn(
                  'relative rounded-xl border-2 p-4 transition-all duration-200',
                  path.color,
                  path.locked ? 'opacity-70' : 'hover:shadow-soft'
                )}
              >
                {path.locked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', path.iconColor)}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{path.title}</h3>
                      {path.completedStages > 0 && (
                        <CheckCircle2 className="h-4 w-4 text-spirit" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Map className="h-3 w-3" />
                        {path.completedStages}/{path.stages} etapas
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {path.duration}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {path.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Aprender;

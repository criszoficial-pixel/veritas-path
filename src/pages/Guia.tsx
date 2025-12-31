import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Heart, Shield, Compass, Sun, Users, Briefcase, Stethoscope, DollarSign, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'emotions',
    title: 'Emociones',
    icon: Heart,
    color: 'bg-pink-500/10 text-pink-600',
    iconBg: 'bg-pink-500',
    subcategories: ['Ansiedad', 'Tristeza', 'Enojo', 'Paz', 'Gratitud'],
  },
  {
    id: 'situations',
    title: 'Situaciones de Vida',
    icon: Compass,
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary',
    subcategories: ['Pérdida', 'Conflictos', 'Trabajo', 'Enfermedad', 'Finanzas'],
  },
  {
    id: 'spiritual',
    title: 'Necesidades Espirituales',
    icon: Sun,
    color: 'bg-accent/10 text-accent',
    iconBg: 'bg-accent',
    subcategories: ['Perdón', 'Dirección', 'Fe', 'Tentaciones', 'Amor de Dios'],
  },
  {
    id: 'protection',
    title: 'Protección y Fortaleza',
    icon: Shield,
    color: 'bg-spirit/10 text-spirit',
    iconBg: 'bg-spirit',
    subcategories: ['Protección', 'Sabiduría', 'Confianza'],
  },
];

const quickAccess = [
  { label: 'Estoy ansioso', icon: '😰', situation: 'ansiedad' },
  { label: 'Necesito paz', icon: '🕊️', situation: 'paz' },
  { label: 'Busco perdón', icon: '🙏', situation: 'perdon' },
  { label: 'Necesito fortaleza', icon: '💪', situation: 'fortaleza' },
];

const Guia = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Guía Espiritual" />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">¿Qué dice la Biblia sobre...?</h2>
          <p className="text-muted-foreground">Encuentra pasajes para tu situación actual</p>
        </section>

        {/* Quick Access */}
        <section className="grid grid-cols-2 gap-3">
          {quickAccess.map((item) => (
            <button
              key={item.situation}
              className="flex items-center gap-3 rounded-xl bg-card p-4 border border-border/50 hover:shadow-soft transition-all duration-200"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-foreground text-sm">{item.label}</span>
            </button>
          ))}
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Explorar por Categoría</h2>
          
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  'w-full rounded-xl p-4 text-left transition-all duration-200 hover:shadow-soft',
                  category.color
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', category.iconBg)}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {category.subcategories.slice(0, 3).join(' • ')}...
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Verse */}
        <section className="rounded-2xl bg-secondary p-6">
          <p className="text-sm text-muted-foreground mb-2">💡 Versículo sugerido</p>
          <blockquote className="font-scripture text-lg text-foreground italic mb-3">
            "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
          </blockquote>
          <p className="text-sm font-medium text-primary">— Mateo 11:28</p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Guia;

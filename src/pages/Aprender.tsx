import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Map, BookOpen, Clock, ChevronRight, Construction } from 'lucide-react';

const Aprender = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Aprender" />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Coming Soon */}
        <section className="text-center py-12 space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Próximamente</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Estamos preparando planes de lectura y rutas de aprendizaje guiadas para profundizar en tu estudio bíblico.
          </p>
        </section>

        {/* Preview of what's coming */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Lo que viene</h3>
          <div className="space-y-3">
            {[
              { icon: Map, title: 'Planes de Lectura', desc: 'Biblia en 1 año, Nuevo Testamento en 90 días' },
              { icon: BookOpen, title: 'Rutas Temáticas', desc: 'Estudia temas específicos de forma guiada' },
              { icon: Clock, title: 'Devocionales', desc: 'Reflexiones diarias con versículos clave' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-card/50 border border-border/50 p-4 opacity-60"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-4">
          <Button className="w-full" onClick={() => navigate('/leer')}>
            <BookOpen className="h-4 w-4 mr-2" />
            Mientras tanto, explora la Biblia
          </Button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Aprender;

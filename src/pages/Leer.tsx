import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { BookSelector } from '@/components/bible/BookSelector';

const Leer = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Biblioteca Bíblica" />
      
      <main className="container px-4 py-6 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-1">Santa Biblia</h2>
          <p className="text-muted-foreground text-sm mb-6">Reina Valera 1960</p>
          
          <BookSelector />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Leer;

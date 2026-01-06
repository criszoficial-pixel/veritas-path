import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DoveIcon } from '@/components/icons/DoveIcon';

interface WelcomeModalProps {
  onComplete: () => void;
}

export const WelcomeModal = ({ onComplete }: WelcomeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('shalom_welcome_seen');
    const storedName = localStorage.getItem('shalom_user_name');
    
    if (!hasSeenWelcome && !storedName) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNameSubmit = () => {
    if (name.trim()) {
      localStorage.setItem('shalom_user_name', name.trim());
    }
    setStep(2);
  };

  const handleComplete = () => {
    localStorage.setItem('shalom_welcome_seen', 'true');
    setIsOpen(false);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('shalom_welcome_seen', 'true');
    setIsOpen(false);
    onComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <DoveIcon size={32} animated={true} />
              </div>
              <DialogTitle className="text-2xl">¡Bienvenido a Shalom! ✨</DialogTitle>
              <DialogDescription className="text-base">
                Tu compañero espiritual para crecer en la fe cada día.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  ¿Cómo te gustaría que te llamemos?
                </label>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className="text-center text-lg"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={handleNameSubmit} className="w-full">
                Continuar
              </Button>
              <Button variant="ghost" onClick={handleSkip} className="w-full text-muted-foreground">
                Saltar
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 text-4xl">🙏</div>
              <DialogTitle className="text-2xl">
                {name ? `¡Hola, ${name}!` : '¡Estás listo!'}
              </DialogTitle>
              <DialogDescription className="text-base">
                Aquí encontrarás:
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-3">
              <FeatureItem emoji="📖" text="La Biblia completa para leer y meditar" />
              <FeatureItem emoji="✨" text="Versículos diarios con reflexiones" />
              <FeatureItem emoji="🔥" text="Sistema de racha para mantener tu hábito" />
              <FeatureItem emoji="🧠" text="Quizzes para fortalecer tu conocimiento" />
            </div>
            
            <Button onClick={handleComplete} className="w-full" size="lg">
              ¡Comenzar! 🚀
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FeatureItem = ({ emoji, text }: { emoji: string; text: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
    <span className="text-xl">{emoji}</span>
    <span className="text-sm text-foreground">{text}</span>
  </div>
);

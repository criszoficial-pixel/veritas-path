import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

export const AnswerFeedback = ({ isCorrect, isLastQuestion, onNext }: AnswerFeedbackProps) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg",
      isCorrect 
        ? "bg-green-100 dark:bg-green-900/30" 
        : "bg-red-100 dark:bg-red-900/30"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isCorrect ? "bg-green-500" : "bg-red-500"
        )}>
          {isCorrect ? (
            <Check className="h-5 w-5 text-white" />
          ) : (
            <X className="h-5 w-5 text-white" />
          )}
        </div>
        <div>
          <p className={cn(
            "font-semibold",
            isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
          )}>
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isCorrect 
              ? '+10 puntos' 
              : 'Sigue intentando'}
          </p>
        </div>
      </div>

      <Button onClick={onNext} className="gap-2">
        {isLastQuestion ? (
          <>
            Ver Resultados
            <RotateCcw className="h-4 w-4" />
          </>
        ) : (
          <>
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

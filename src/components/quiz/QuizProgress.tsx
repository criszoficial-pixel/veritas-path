import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  current: number;
  total: number;
  correctAnswers: number;
}

export const QuizProgress = ({ current, total, correctAnswers }: QuizProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Pregunta {current} de {total}
        </span>
        <span className="font-medium text-green-600 dark:text-green-400">
          ✓ {correctAnswers} correctas
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

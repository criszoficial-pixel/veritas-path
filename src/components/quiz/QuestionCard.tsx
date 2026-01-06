import { QuizQuestion } from '@/data/quizQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
  onConfirm: () => void;
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  onConfirm
}: QuestionCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medio': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'dificil': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium capitalize",
            getDifficultyColor(question.difficulty)
          )}>
            {question.difficulty}
          </span>
          <span className="text-xs text-muted-foreground">
            {question.reference}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {question.question}
        </h2>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = isAnswered;

            return (
              <button
                key={index}
                onClick={() => !isAnswered && onSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                  "flex items-center justify-between",
                  !isAnswered && !isSelected && "hover:border-primary/50 hover:bg-muted/50",
                  !isAnswered && isSelected && "border-primary bg-primary/10",
                  showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                  showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20",
                  showResult && !isSelected && !isCorrect && "opacity-50"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    !isAnswered && !isSelected && "bg-muted",
                    !isAnswered && isSelected && "bg-primary text-primary-foreground",
                    showResult && isCorrect && "bg-green-500 text-white",
                    showResult && isSelected && !isCorrect && "bg-red-500 text-white"
                  )}>
                    {showResult ? (
                      isCorrect ? <Check className="h-4 w-4" /> : 
                      isSelected ? <X className="h-4 w-4" /> : 
                      String.fromCharCode(65 + index)
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className={cn(
                    "font-medium",
                    showResult && isCorrect && "text-green-700 dark:text-green-400",
                    showResult && isSelected && !isCorrect && "text-red-700 dark:text-red-400"
                  )}>
                    {option}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={cn(
            "p-4 rounded-lg mb-4",
            selectedAnswer === question.correctAnswer 
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          )}>
            <p className="text-sm">
              <span className="font-semibold">Explicación: </span>
              {question.explanation}
            </p>
          </div>
        )}

        {!isAnswered && (
          <Button 
            onClick={onConfirm}
            disabled={selectedAnswer === null}
            size="lg"
          >
            Confirmar Respuesta
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

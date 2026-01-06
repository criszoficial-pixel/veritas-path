import { Link } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuizSuggestionProps {
  bookId: string;
  bookName: string;
}

// Mapeo de nombres de libros a IDs de categorías de quiz disponibles
const bookToQuizCategory: Record<string, string> = {
  'genesis': 'genesis',
  'génesis': 'genesis',
  'exodo': 'exodo',
  'éxodo': 'exodo',
  'salmos': 'salmos',
  'proverbios': 'proverbios',
  'mateo': 'mateo',
  'juan': 'juan',
  'hechos': 'hechos',
  'romanos': 'romanos',
  'apocalipsis': 'apocalipsis'
};

export const QuizSuggestion = ({ bookId, bookName }: QuizSuggestionProps) => {
  const normalizedBookId = bookId.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const quizCategoryId = bookToQuizCategory[normalizedBookId];
  
  // Si no hay quiz disponible para este libro, no mostrar nada
  if (!quizCategoryId) {
    return null;
  }

  return (
    <Card className="mt-8 p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/20 text-primary">
          <Brain className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">
            ¿Terminaste de leer?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Pon a prueba tu conocimiento sobre el libro de {bookName}
          </p>
          <Button asChild size="sm" className="gap-2">
            <Link to={`/quizzes/jugar/${quizCategoryId}`}>
              Hacer Quiz de {bookName}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

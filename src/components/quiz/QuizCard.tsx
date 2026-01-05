import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizCategory } from '@/data/quizData';
import { getCategoryStats } from '@/services/quizService';
import { Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizCardProps {
  category: QuizCategory;
}

export const QuizCard = ({ category }: QuizCardProps) => {
  const stats = getCategoryStats(category.id);
  const hasPlayed = stats.attempts > 0;

  return (
    <Link to={`/quizzes/jugar/${category.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 overflow-hidden">
        <CardContent className="p-0">
          <div 
            className="h-2 w-full"
            style={{ backgroundColor: category.color }}
          />
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              {hasPlayed && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {stats.bestPercentage}%
                </Badge>
              )}
            </div>
            
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {category.questionCount} preguntas
              </span>
              {hasPlayed && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {stats.attempts} {stats.attempts === 1 ? 'intento' : 'intentos'}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

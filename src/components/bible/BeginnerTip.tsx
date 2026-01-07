import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function BeginnerTip() {
  return (
    <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-1">
            ¿Primera vez leyendo la Biblia?
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Te recomendamos comenzar con Los Evangelios para conocer la vida y enseñanzas de Jesús.
          </p>
          <Link 
            to="/leer/evangelios"
            className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            Comenzar con los Evangelios
            <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

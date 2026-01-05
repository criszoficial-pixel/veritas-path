import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TextSearchResult } from '@/services/searchService';

interface SearchResultItemProps {
  result: TextSearchResult;
  query: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);
  
  if (matchIndex === -1) return text;
  
  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);
  
  return (
    <>
      {before}
      <mark className="bg-primary/30 text-foreground px-0.5 rounded">{match}</mark>
      {after}
    </>
  );
}

export function SearchResultItem({ result, query }: SearchResultItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/leer/${result.bookSlug}/${result.chapter}`);
  };

  // Truncate text for display with context around the match
  const getDisplayText = () => {
    const maxLength = 120;
    const text = result.verseText;
    
    if (text.length <= maxLength) {
      return highlightText(text, query);
    }
    
    // Center the text around the match
    const lowerText = text.toLowerCase();
    const matchIndex = lowerText.indexOf(query.toLowerCase());
    
    if (matchIndex === -1) {
      return highlightText(text.slice(0, maxLength) + '...', query);
    }
    
    const contextLength = Math.floor((maxLength - query.length) / 2);
    let start = Math.max(0, matchIndex - contextLength);
    let end = Math.min(text.length, matchIndex + query.length + contextLength);
    
    let displayText = text.slice(start, end);
    
    if (start > 0) displayText = '...' + displayText;
    if (end < text.length) displayText = displayText + '...';
    
    return highlightText(displayText, query);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col gap-1.5 w-full p-4 rounded-xl bg-card border border-border hover:bg-accent transition-colors text-left group"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          {result.reference}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {getDisplayText()}
      </p>
    </button>
  );
}

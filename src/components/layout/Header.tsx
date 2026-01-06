import { Search, Bell, ChevronLeft } from 'lucide-react';
import doveIcon from '@/assets/dove.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header = ({ 
  title = 'Shalom', 
  showSearch = true, 
  showNotifications = true,
  showBack = false,
  onBack
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : (
            <img src={doveIcon} alt="Shalom" className="h-8 w-8" />
          )}
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>
        
        <div className="flex items-center gap-1">
          {showSearch && (
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => navigate('/buscar')}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

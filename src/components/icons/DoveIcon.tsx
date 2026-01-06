import { cn } from '@/lib/utils';

interface DoveIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const DoveIcon = ({ className, size = 24, animated = true }: DoveIconProps) => {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Divine glow effect */}
      {animated && (
        <div className="absolute inset-0 animate-dove-glow rounded-full bg-wisdom/40 blur-md" />
      )}
      
      {/* Dove SVG */}
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size}
        className={cn("relative z-10", animated && "animate-dove-float")}
        fill="none"
      >
        {/* Dove body and wings */}
        <g className={cn(animated && "animate-dove-wings origin-center")}>
          {/* Main body */}
          <path 
            d="M12 4C10.5 6 9 7.5 6.5 8.5C7.5 9.5 8 11 8 13C5.5 12 3.5 11 2 11C4 14 7 16 12 16C17 16 20 14 22 11C20.5 11 18.5 12 16 13C16 11 16.5 9.5 17.5 8.5C15 7.5 13.5 6 12 4Z" 
            fill="white"
            stroke="hsl(var(--wisdom-gold))"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Wing detail left */}
          <path 
            d="M8 13C7 11.5 5.5 10.5 3 10C4.5 11.5 6 12.5 8 13Z" 
            fill="white"
            stroke="hsl(var(--wisdom-gold) / 0.6)"
            strokeWidth="0.3"
          />
          {/* Wing detail right */}
          <path 
            d="M16 13C17 11.5 18.5 10.5 21 10C19.5 11.5 18 12.5 16 13Z" 
            fill="white"
            stroke="hsl(var(--wisdom-gold) / 0.6)"
            strokeWidth="0.3"
          />
          {/* Tail feathers */}
          <path 
            d="M12 16C12 17 11.5 18.5 10 20C11 18.5 12 18.5 14 20C12.5 18.5 12 17 12 16Z" 
            fill="white"
            stroke="hsl(var(--wisdom-gold) / 0.5)"
            strokeWidth="0.3"
          />
          {/* Head highlight */}
          <circle 
            cx="12" 
            cy="6" 
            r="1.5" 
            fill="white"
            stroke="hsl(var(--wisdom-gold) / 0.4)"
            strokeWidth="0.3"
          />
          {/* Eye */}
          <circle 
            cx="12" 
            cy="5.8" 
            r="0.4" 
            fill="hsl(var(--faith-navy))"
          />
        </g>
      </svg>
    </div>
  );
};

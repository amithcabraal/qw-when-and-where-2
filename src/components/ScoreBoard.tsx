import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  lastPoints?: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, lastPoints }) => {
  const [showDelta, setShowDelta] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => {
    if (lastPoints !== undefined) {
      setShowDelta(true);
      setAnimateScore(true);
      const timer = setTimeout(() => {
        setShowDelta(false);
        setAnimateScore(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastPoints]);

  return (
    <div className="flex items-center space-x-2 text-base md:text-lg font-semibold">
      <Trophy className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
      <span className={animateScore ? 'animate-pulse' : ''}>Score: {score}</span>
      {showDelta && (
        <span 
          className={`
            text-green-600 
            animate-[fadeInOut_2s_ease-in-out]
          `}
          style={{
            animation: 'fadeInOut 2s ease-in-out'
          }}
        >
          ({lastPoints && lastPoints >= 0 ? '+' : ''}{lastPoints})
        </span>
      )}
    </div>
  );
};
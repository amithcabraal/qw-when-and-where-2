import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultMessageProps {
  isCorrect: boolean;
  message: string;
}

export const ResultMessage: React.FC<ResultMessageProps> = ({ isCorrect, message }) => {
  return (
    <div
      className={`w-full flex items-start p-3 md:p-4 rounded-md text-sm md:text-base ${
        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isCorrect ? (
        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      )}
      <p className="whitespace-pre-line">{message}</p>
    </div>
  );
};
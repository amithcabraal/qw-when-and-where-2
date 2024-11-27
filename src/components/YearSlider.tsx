import React from 'react';

interface YearSliderProps {
  value: number;
  onChange: (year: number) => void;
  correctYear?: number;
  disabled: boolean;
}

export const YearSlider: React.FC<YearSliderProps> = ({ 
  value, 
  onChange, 
  correctYear,
  disabled 
}) => {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm md:text-base font-medium text-gray-700">
        Select Year: {value}
        {correctYear && (
          <span className="ml-2 text-green-600">
            (Correct: {correctYear})
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type="range"
          min="1900"
          max="2024"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        {correctYear && (
          <div 
            className="absolute w-4 h-4 bg-green-500 rounded-full -mt-[6px]"
            style={{
              left: `${((correctYear - 1900) / (2024 - 1900)) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
      <div className="flex justify-between text-xs md:text-sm text-gray-500">
        <span>1900</span>
        <span>2024</span>
      </div>
    </div>
  );
};
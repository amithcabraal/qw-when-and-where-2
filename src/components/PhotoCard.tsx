import React from 'react';
import { Image } from 'lucide-react';

interface PhotoCardProps {
  imageUrl: string;
  isRevealed: boolean;
  photographer?: string;
  description?: string;
  location?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ 
  imageUrl, 
  isRevealed,
  photographer,
  description,
  location
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Sports moment"
          className={`w-full h-48 sm:h-64 md:h-[400px] object-cover transition-opacity duration-500 ${
            isRevealed ? 'opacity-100' : 'opacity-70'
          }`}
        />
      ) : (
        <div className="w-full h-48 sm:h-64 md:h-[400px] bg-gray-200 flex items-center justify-center">
          <Image className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
        </div>
      )}
      
      {/* Base overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Info overlay */}
      {isRevealed && (
        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 text-white">
          <div className="space-y-2">
            <p className="text-sm md:text-base font-semibold text-gray-200">
              Photographer: {photographer}
            </p>
            <p className="text-xs md:text-sm leading-relaxed">
              {description}
            </p>
            <p className="text-xs md:text-sm text-gray-300 mt-2">
              Location: {location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
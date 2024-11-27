import React, { useState } from 'react';
import { Camera, Trophy } from 'lucide-react';
import { sportsPhotos } from './data/photos';
import { PhotoCard } from './components/PhotoCard';
import { GuessForm } from './components/GuessForm';
import { ScoreBoard } from './components/ScoreBoard';
import { calculateDistance, calculateLocationScore, calculateYearScore } from './utils/scoring';
import { Coordinates } from './types';

function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState<number | undefined>();
  const [isRevealed, setIsRevealed] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetMap, setResetMap] = useState(false);

  const currentPhoto = sportsPhotos[currentPhotoIndex];

  const handleGuess = (guessedLocation: Coordinates, guessedYear: number) => {
    if (isRevealed) {
      // Handle "Next Question" click
      if (currentPhotoIndex < sportsPhotos.length - 1) {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
        setIsRevealed(false);
        setLastPoints(undefined);
        setResetMap(true);
        setTimeout(() => setResetMap(false), 100);
      } else {
        setGameComplete(true);
      }
      return;
    }

    const distance = calculateDistance(guessedLocation, currentPhoto.location);
    const locationScore = calculateLocationScore(distance);
    const yearScore = calculateYearScore(guessedYear, currentPhoto.year);
    
    const totalScore = Math.round((locationScore + yearScore) / 2);
    setScore(score + totalScore);
    setLastPoints(totalScore);
    setIsRevealed(true);
  };

  const resetGame = () => {
    setCurrentPhotoIndex(0);
    setScore(0);
    setLastPoints(undefined);
    setIsRevealed(false);
    setGameComplete(false);
    setResetMap(true);
    setTimeout(() => setResetMap(false), 100);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md w-full text-center">
          <Trophy className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-4">Game Complete!</h2>
          <p className="text-base md:text-lg mb-4">Final Score: {score}</p>
          <button
            onClick={resetGame}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-4 md:py-8 px-4">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
            <Camera className="mr-2 w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden sm:inline">Sports History Guessing Game</span>
            <span className="sm:hidden">Sports History</span>
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Drop a pin and select the year
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Photo {currentPhotoIndex + 1} of {sportsPhotos.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-6">
          <ScoreBoard score={score} lastPoints={lastPoints} />
          
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            <PhotoCard
              imageUrl={currentPhoto.imageUrl}
              isRevealed={isRevealed}
              photographer={currentPhoto.photographer}
              description={currentPhoto.description}
              location={currentPhoto.location.name}
            />

            <GuessForm
              onSubmit={handleGuess}
              disabled={false}
              currentPhoto={currentPhoto}
              isRevealed={isRevealed}
              resetMap={resetMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
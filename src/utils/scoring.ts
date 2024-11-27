import { Coordinates } from '../types';

export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

export function calculateLocationScore(distance: number): number {
  if (distance < 10) return 100;
  if (distance < 50) return 80;
  if (distance < 100) return 60;
  if (distance < 500) return 40;
  if (distance < 1000) return 20;
  return 0;
}

export function calculateYearScore(guessedYear: number, actualYear: number): number {
  const difference = Math.abs(guessedYear - actualYear);
  if (difference === 0) return 100;
  if (difference === 1) return 80;
  if (difference <= 3) return 60;
  if (difference <= 5) return 40;
  if (difference <= 10) return 20;
  return 0;
}
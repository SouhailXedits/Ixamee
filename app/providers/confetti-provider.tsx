'use client';

import { useConfettiStore } from '@/store/use-confetti-store';
import ReactConfetti from 'react-confetti';

export const ConfettiProvider = () => {
  const { isOpen, onClose } = useConfettiStore();

  // Only render the confetti if isOpen is true
  if (!isOpen) return null;

  // Use a document-level z-index to ensure the confetti appears on top of all elements
  const zIndex = 2147483647; // Highest possible value for z-index

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      style={{ zIndex }} // Set the z-index style property
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={onClose}
    />
  );
};

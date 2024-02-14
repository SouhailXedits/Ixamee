'use client';

import { useConfettiStore } from '@/store/use-confetti-store';
import ReactConfetti from 'react-confetti';



export const ConfettiProvider = () => {
  const confetti = useConfettiStore();
  console.log(confetti);
  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

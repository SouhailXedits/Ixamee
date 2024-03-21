export function generateSixDigitNumber() {
  // Generate a random number between 0 and 1
  const randomValue = Math.random();

  // Multiply the random number by 10 million (9,999,999) to shift the range to six digits
  const sixDigitNumber = Math.floor(randomValue * 9_000_000);

  // Add 100,000 to shift the range to start from 100,000 instead of 0
  return 100_000 + sixDigitNumber;
}

import { describe, expect, test } from 'vitest';

describe('sum function', () => {
  test('adds two numbers together', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });

  test('throws an error when passed non-numbers', () => {
    expect(() => sum('a', 'b')).toThrowError();
  });
});

function sum(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }

  return a + b;
}

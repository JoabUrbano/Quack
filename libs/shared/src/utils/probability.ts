/**
 *
 * @param chance The probability percentage (0-100) of the event occurring.
 * @returns A boolean indicating whether the event occurred.
 */
export function probabilityEvent(chance: number): boolean {
  const randomValue = Math.floor(Math.random() * 101); // [0, 100]

  console.log(`${randomValue} < ${chance} ? ${randomValue < chance}`);

  return randomValue < chance;
}

import { eyeSeeds } from "../constants";

const TOTAL_STEPS = 8;

function lcgNext(value: number): number {
  return (1664525 * value + 1013904223) >>> 0;
}

export type EyePath = {
  x: number[];
  y: number[];
  duration: number;
};

export function createEyePath(seed: number): EyePath {
  const xValues: number[] = [0];
  const yValues: number[] = [0];
  let current = seed >>> 0;

  for (let index = 0; index < TOTAL_STEPS; index += 1) {
    current = lcgNext(current);
    const normalizedX = (current / 0xffffffff) * 6 - 3;
    current = lcgNext(current);
    const normalizedY = (current / 0xffffffff) * 4 - 2;
    xValues.push(Number(normalizedX.toFixed(2)));
    yValues.push(Number(normalizedY.toFixed(2)));
  }

  xValues.push(0);
  yValues.push(0);

  return {
    x: xValues,
    y: yValues,
    duration: 6 + (seed % 3),
  };
}

export function buildEyePaths(): EyePath[] {
  return eyeSeeds.map(createEyePath);
}

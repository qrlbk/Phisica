export function calcPotentialEnergy(mass: number, height: number, g = 9.8): number {
  return mass * g * height;
}

export function calcKineticEnergy(mass: number, speed: number): number {
  return (mass * speed * speed) / 2;
}

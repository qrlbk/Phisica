export function calcNormalForce(mass: number, g = 9.8): number {
  return mass * g;
}

export function calcFrictionForce(mu: number, normalForce: number): number {
  return mu * normalForce;
}

export function canObjectMove(appliedForce: number, frictionForce: number): boolean {
  return appliedForce > frictionForce;
}

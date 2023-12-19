export function requiredError(name: string) {
  return `${name} es un campo requerido.`;
}

export function notValidError(name: string) {
  return `${name} no es válido.`;
}

export function outOfBoundsError(name: string, min?: number, max?: number) {
  let range = "";

  if (min !== undefined) range += `\n- mínimo: ${min}`;
  if (max !== undefined) range += `\n- máximo: ${max}`;

  return `${name} fuera de rango.${range}`;
}

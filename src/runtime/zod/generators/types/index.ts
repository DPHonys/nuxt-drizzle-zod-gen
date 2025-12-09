import { generateStringType } from './string'

export function isTypeGeneratorKey(
  key: string
): key is keyof typeof typeGenerators {
  return key in typeGenerators
}

export const typeGenerators = {
  string: generateStringType,
}

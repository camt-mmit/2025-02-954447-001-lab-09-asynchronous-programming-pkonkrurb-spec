import { AllowedValueObjectType, ValueObject } from './types';

export function createValueObject<T extends AllowedValueObjectType>(value: T): ValueObject<T> {
  return { value };
}

export function extractValueObject<T extends AllowedValueObjectType, VO extends ValueObject<T>>(
  valueObject: VO,
): T {
  return valueObject.value;
}

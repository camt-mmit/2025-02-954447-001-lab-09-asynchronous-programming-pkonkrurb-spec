export type AllowedValueObjectType = string | number | boolean | bigint | symbol | null | undefined;

export interface ValueObject<T extends AllowedValueObjectType> {
  readonly value: T;
}

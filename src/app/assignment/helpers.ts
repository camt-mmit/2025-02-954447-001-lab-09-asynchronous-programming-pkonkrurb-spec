import { DynamicSection } from './types';

export function createDynamicSectionValue(): DynamicSection[number][number] {
  return 0;
}

export function createDynamicSectionItem(): DynamicSection[number] {
  return [createDynamicSectionValue()];
}

export function createDynamicSection(): DynamicSection {
  return [createDynamicSectionItem()];
}

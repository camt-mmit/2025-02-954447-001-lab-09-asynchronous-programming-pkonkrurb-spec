import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, linkedSignal, model } from '@angular/core';
import {
  FieldTree,
  FormField,
  applyEach,
  createMetadataKey,
  form,
  metadata,
} from '@angular/forms/signals';
import { createDynamicSectionItem, createDynamicSectionValue } from '../../helpers';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<DynamicSection>();

  private syncedSource: DynamicSection | null = null;

  protected readonly model = linkedSignal({
    source: this.data,
    computation: (source, previous): DynamicSection => {
      if (typeof previous === 'undefined' || this.syncedSource !== source) {
        return source;
      } else {
        return previous.value;
      }
    },
  });

  protected readonly totalKey = createMetadataKey<number>();

  protected readonly form = form(this.model, (root) => {
    applyEach(root, (section) => {
      metadata(section, this.totalKey, ({ valueOf }) =>
        valueOf(section).reduce((sum, val) => sum + val, 0),
      );
    });
  });

  constructor() {
    effect(() => {
      this.syncedSource = this.model();
      this.data.set(this.syncedSource);
    });
  }

  protected addItem(): void {
    this.form().value.update((items) => [...items, createDynamicSectionItem()]);
  }

  protected removeItem(index: number): void {
    this.form().value.update((items) => items.filter((_, i) => i !== index));
  }

  protected addValue(sectionField: FieldTree<DynamicSection[number]>): void {
    sectionField().value.update((items: readonly number[]) => [
      ...items,
      createDynamicSectionValue(),
    ]);
  }

  protected removeValue(sectionField: FieldTree<DynamicSection[number]>, index: number): void {
    sectionField().value.update((items: readonly number[]) => items.filter((_, i) => i !== index));
  }
}

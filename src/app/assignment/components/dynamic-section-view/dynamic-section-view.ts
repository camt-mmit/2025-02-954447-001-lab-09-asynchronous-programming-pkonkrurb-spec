import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-view',
  imports: [DecimalPipe],
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionView {
  readonly data = input.required<DynamicSection>();

  protected readonly totals = computed(() =>
    this.data().reduce(
      (result, values) => [...result, values.reduce((total, value) => total + value, 0)],
      [],
    ),
  );
}

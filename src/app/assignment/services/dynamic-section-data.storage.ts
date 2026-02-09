import { Injectable } from '@angular/core';
import { DynamicSection } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DynamicSectionDataStorage {
  private readonly STORAGE_KEY = 'app-dynamic-section-data';

  // Simulate Async Load
  get(): Promise<DynamicSection | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          resolve(JSON.parse(stored) as DynamicSection);
        } else {
          resolve(null);
        }
      }, 500); // Simulate network delay
    });
  }

  // Simulate Async Save
  set(data: DynamicSection): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        resolve();
      }, 500);
    });
  }
}

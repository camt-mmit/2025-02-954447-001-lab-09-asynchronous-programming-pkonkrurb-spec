import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, linkedSignal, model } from '@angular/core';
import { FormField, createMetadataKey, form, metadata } from '@angular/forms/signals';
import { createFriend, toFriendModel, toProfile, toProfileModel } from '../../helpers';
import { Profile, ProfileModel } from '../../types';

@Component({
  selector: 'app-profile-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileForm {
  readonly data = model.required<Profile>();

  private syncedSource: Profile | null = null;

  protected readonly model = linkedSignal({
    source: this.data,
    computation: (source, previous): ProfileModel => {
      if (typeof previous === 'undefined' || this.syncedSource !== source) {
        return toProfileModel(source);
      } else {
        return previous.value;
      }
    },
  });

  protected readonly friendsCountKey = createMetadataKey<number>();

  protected readonly form = form(this.model, (path) => {
    metadata(path.friends, this.friendsCountKey, ({ value }) => value().length);
  });

  constructor() {
    effect(() => {
      this.syncedSource = toProfile(this.model());
      this.data.set(this.syncedSource);
    });
  }

  protected addFriend(): void {
    this.form.friends().value.update((items) => [...items, toFriendModel(createFriend())]);
  }

  protected removeFriend(index: number): void {
    this.form.friends().value.update((items) => items.filter((_item, i) => i !== index));
  }

  protected moveFriend(index: number, offset: number): void {
    this.form
      .friends()
      .value.update((items) =>
        items.map((item, i) =>
          i === index ? items[index + offset] : i === index + offset ? items[index] : item,
        ),
      );
  }
}

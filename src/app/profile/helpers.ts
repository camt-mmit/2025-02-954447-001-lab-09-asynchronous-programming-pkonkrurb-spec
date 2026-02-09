import { createValueObject, extractValueObject } from '../helpers';
import { Profile, ProfileModel } from './types';

export function createFriend(): Profile['friends'][number] {
  return '';
}

export function createProfile(): Profile {
  return {
    studentId: '',
    firstname: '',
    lastname: '',
    age: 0,
    autobiography: '',
    friends: [createFriend()],
  };
}

// -------------- To Model -----------------
export function toFriendModel(value: Profile['friends'][number]): ProfileModel['friends'][number] {
  return createValueObject(value);
}

export function toProfileModel(value: Profile): ProfileModel {
  const { friends, ...rest } = value;

  return {
    ...rest,
    friends: friends.map(toFriendModel),
  };
}

// -------------- To Value -----------------
export function toFriend(model: ProfileModel['friends'][number]): Profile['friends'][number] {
  return extractValueObject(model);
}

export function toProfile(model: ProfileModel): Profile {
  const { friends, ...rest } = model;

  return {
    ...rest,
    friends: friends.map(toFriend),
  };
}

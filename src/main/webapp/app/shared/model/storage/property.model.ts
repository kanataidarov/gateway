import { Moment } from 'moment';

export interface IProperty {
  id?: number;
  name?: string;
  created?: Moment;
  updated?: Moment;
  groupId?: number;
}

export const defaultValue: Readonly<IProperty> = {};

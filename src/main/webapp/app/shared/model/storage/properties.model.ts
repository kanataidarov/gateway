import { Moment } from 'moment';

export interface IProperties {
  id?: number;
  name?: string;
  value?: string;
  created?: Moment;
  updated?: Moment;
  group_id?: number;
}

export const defaultValue: Readonly<IProperties> = {};

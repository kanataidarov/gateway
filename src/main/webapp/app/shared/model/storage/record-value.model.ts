import { Moment } from 'moment';

export interface IRecordValue {
  id?: number;
  value?: string;
  created?: Moment;
  updated?: Moment;
  recordId?: number;
  fieldId?: number;
}

export const defaultValue: Readonly<IRecordValue> = {};

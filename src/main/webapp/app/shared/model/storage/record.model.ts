import { Moment } from 'moment';
import { IRecordValue } from 'app/shared/model/storage/record-value.model';

export interface IRecord {
  id?: number;
  code?: number;
  created?: Moment;
  updated?: Moment;
  recordRecordValues?: IRecordValue[];
}

export const defaultValue: Readonly<IRecord> = {};

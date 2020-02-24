import { IRecordValue } from 'app/shared/model/storage/record-value.model';

export interface IRecordField {
  id?: number;
  name?: string;
  description?: string;
  recordFieldRecordValues?: IRecordValue[];
  templateId?: number;
}

export const defaultValue: Readonly<IRecordField> = {};

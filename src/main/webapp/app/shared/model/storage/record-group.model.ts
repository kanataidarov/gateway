import { IRecordTemplate } from 'app/shared/model/storage/record-template.model';
import { RecordType } from 'app/shared/model/enumerations/record-type.model';

export interface IRecordGroup {
  id?: number;
  name?: string;
  type?: RecordType;
  recordGroupRecordTemplates?: IRecordTemplate[];
}

export const defaultValue: Readonly<IRecordGroup> = {};

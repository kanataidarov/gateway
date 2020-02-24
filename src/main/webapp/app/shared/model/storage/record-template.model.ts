import { Moment } from 'moment';
import { IRecordField } from 'app/shared/model/storage/record-field.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IRecordTemplate {
  id?: number;
  name?: string;
  created?: Moment;
  updated?: Moment;
  language?: Language;
  recordTemplateRecordFields?: IRecordField[];
  groupId?: number;
}

export const defaultValue: Readonly<IRecordTemplate> = {};

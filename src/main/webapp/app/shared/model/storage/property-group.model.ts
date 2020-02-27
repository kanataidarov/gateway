import { IProperty } from 'app/shared/model/storage/property.model';

export interface IPropertyGroup {
  id?: number;
  name?: string;
  propertyGroupProperties?: IProperty[];
}

export const defaultValue: Readonly<IPropertyGroup> = {};

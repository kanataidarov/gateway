import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import propertyGroup, {
  PropertyGroupState
} from 'app/entities/storage/property-group/property-group.reducer';
// prettier-ignore
import property, {
  PropertyState
} from 'app/entities/storage/property/property.reducer';
// prettier-ignore
import recordGroup, {
  RecordGroupState
} from 'app/entities/storage/record-group/record-group.reducer';
// prettier-ignore
import recordTemplate, {
  RecordTemplateState
} from 'app/entities/storage/record-template/record-template.reducer';
// prettier-ignore
import recordField, {
  RecordFieldState
} from 'app/entities/storage/record-field/record-field.reducer';
// prettier-ignore
import record, {
  RecordState
} from 'app/entities/storage/record/record.reducer';
// prettier-ignore
import recordValue, {
  RecordValueState
} from 'app/entities/storage/record-value/record-value.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly propertyGroup: PropertyGroupState;
  readonly property: PropertyState;
  readonly recordGroup: RecordGroupState;
  readonly recordTemplate: RecordTemplateState;
  readonly recordField: RecordFieldState;
  readonly record: RecordState;
  readonly recordValue: RecordValueState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  propertyGroup,
  property,
  recordGroup,
  recordTemplate,
  recordField,
  record,
  recordValue,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;

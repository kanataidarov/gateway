import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PropertyGroup from './storage/property-group';
import Property from './storage/property';
import RecordGroup from './storage/record-group';
import RecordTemplate from './storage/record-template';
import RecordField from './storage/record-field';
import Record from './storage/record';
import RecordValue from './storage/record-value';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}property-group`} component={PropertyGroup} />
      <ErrorBoundaryRoute path={`${match.url}property`} component={Property} />
      <ErrorBoundaryRoute path={`${match.url}record-group`} component={RecordGroup} />
      <ErrorBoundaryRoute path={`${match.url}record-template`} component={RecordTemplate} />
      <ErrorBoundaryRoute path={`${match.url}record-field`} component={RecordField} />
      <ErrorBoundaryRoute path={`${match.url}record`} component={Record} />
      <ErrorBoundaryRoute path={`${match.url}record-value`} component={RecordValue} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecordField from './record-field';
import RecordFieldDetail from './record-field-detail';
import RecordFieldUpdate from './record-field-update';
import RecordFieldDeleteDialog from './record-field-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecordFieldDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecordFieldUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecordFieldUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecordFieldDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecordField} />
    </Switch>
  </>
);

export default Routes;

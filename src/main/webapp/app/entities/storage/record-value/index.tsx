import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecordValue from './record-value';
import RecordValueDetail from './record-value-detail';
import RecordValueUpdate from './record-value-update';
import RecordValueDeleteDialog from './record-value-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecordValueDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecordValueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecordValueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecordValueDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecordValue} />
    </Switch>
  </>
);

export default Routes;

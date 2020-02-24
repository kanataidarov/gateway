import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecordGroup from './record-group';
import RecordGroupDetail from './record-group-detail';
import RecordGroupUpdate from './record-group-update';
import RecordGroupDeleteDialog from './record-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecordGroupDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecordGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecordGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecordGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecordGroup} />
    </Switch>
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PropertyGroup from './property-group';
import PropertyGroupDetail from './property-group-detail';
import PropertyGroupUpdate from './property-group-update';
import PropertyGroupDeleteDialog from './property-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PropertyGroupDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PropertyGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PropertyGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PropertyGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={PropertyGroup} />
    </Switch>
  </>
);

export default Routes;

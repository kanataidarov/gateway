import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Properties from './properties';
import PropertiesDetail from './properties-detail';
import PropertiesUpdate from './properties-update';
import PropertiesDeleteDialog from './properties-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PropertiesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PropertiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PropertiesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PropertiesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Properties} />
    </Switch>
  </>
);

export default Routes;

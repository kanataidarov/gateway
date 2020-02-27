import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecordTemplate from './record-template';
import RecordTemplateDetail from './record-template-detail';
import RecordTemplateUpdate from './record-template-update';
import RecordTemplateDeleteDialog from './record-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecordTemplateDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecordTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecordTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecordTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecordTemplate} />
    </Switch>
  </>
);

export default Routes;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './properties.reducer';
import { IProperties } from 'app/shared/model/storage/properties.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPropertiesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropertiesDetail = (props: IPropertiesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { propertiesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.storageProperties.detail.title">Properties</Translate> [<b>{propertiesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.storageProperties.name">Name</Translate>
            </span>
          </dt>
          <dd>{propertiesEntity.name}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="gatewayApp.storageProperties.value">Value</Translate>
            </span>
          </dt>
          <dd>{propertiesEntity.value}</dd>
          <dt>
            <span id="created">
              <Translate contentKey="gatewayApp.storageProperties.created">Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={propertiesEntity.created} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="updated">
              <Translate contentKey="gatewayApp.storageProperties.updated">Updated</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={propertiesEntity.updated} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="group_id">
              <Translate contentKey="gatewayApp.storageProperties.group_id">Group Id</Translate>
            </span>
          </dt>
          <dd>{propertiesEntity.group_id}</dd>
        </dl>
        <Button tag={Link} to="/properties" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/properties/${propertiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ properties }: IRootState) => ({
  propertiesEntity: properties.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesDetail);

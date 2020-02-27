import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './record-group.reducer';
import { IRecordGroup } from 'app/shared/model/storage/record-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordGroupDetail = (props: IRecordGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recordGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.storageRecordGroup.detail.title">RecordGroup</Translate> [<b>{recordGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.storageRecordGroup.name">Name</Translate>
            </span>
          </dt>
          <dd>{recordGroupEntity.name}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="gatewayApp.storageRecordGroup.type">Type</Translate>
            </span>
          </dt>
          <dd>{recordGroupEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/record-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/record-group/${recordGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recordGroup }: IRootState) => ({
  recordGroupEntity: recordGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordGroupDetail);

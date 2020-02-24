import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './record-value.reducer';
import { IRecordValue } from 'app/shared/model/storage/record-value.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordValueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordValueDetail = (props: IRecordValueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recordValueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.storageRecordValue.detail.title">RecordValue</Translate> [<b>{recordValueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="gatewayApp.storageRecordValue.value">Value</Translate>
            </span>
          </dt>
          <dd>{recordValueEntity.value}</dd>
          <dt>
            <span id="created">
              <Translate contentKey="gatewayApp.storageRecordValue.created">Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={recordValueEntity.created} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="updated">
              <Translate contentKey="gatewayApp.storageRecordValue.updated">Updated</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={recordValueEntity.updated} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.storageRecordValue.record">Record</Translate>
          </dt>
          <dd>{recordValueEntity.recordId ? recordValueEntity.recordId : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.storageRecordValue.field">Field</Translate>
          </dt>
          <dd>{recordValueEntity.fieldId ? recordValueEntity.fieldId : ''}</dd>
        </dl>
        <Button tag={Link} to="/record-value" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/record-value/${recordValueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recordValue }: IRootState) => ({
  recordValueEntity: recordValue.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordValueDetail);

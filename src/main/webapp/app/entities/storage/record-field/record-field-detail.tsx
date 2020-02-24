import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './record-field.reducer';
import { IRecordField } from 'app/shared/model/storage/record-field.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordFieldDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordFieldDetail = (props: IRecordFieldDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recordFieldEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.storageRecordField.detail.title">RecordField</Translate> [<b>{recordFieldEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.storageRecordField.name">Name</Translate>
            </span>
          </dt>
          <dd>{recordFieldEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.storageRecordField.description">Description</Translate>
            </span>
          </dt>
          <dd>{recordFieldEntity.description}</dd>
          <dt>
            <Translate contentKey="gatewayApp.storageRecordField.template">Template</Translate>
          </dt>
          <dd>{recordFieldEntity.templateId ? recordFieldEntity.templateId : ''}</dd>
        </dl>
        <Button tag={Link} to="/record-field" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/record-field/${recordFieldEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recordField }: IRootState) => ({
  recordFieldEntity: recordField.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordFieldDetail);

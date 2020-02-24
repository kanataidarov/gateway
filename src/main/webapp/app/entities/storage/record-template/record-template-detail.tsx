import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './record-template.reducer';
import { IRecordTemplate } from 'app/shared/model/storage/record-template.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordTemplateDetail = (props: IRecordTemplateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recordTemplateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.storageRecordTemplate.detail.title">RecordTemplate</Translate> [<b>{recordTemplateEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.storageRecordTemplate.name">Name</Translate>
            </span>
          </dt>
          <dd>{recordTemplateEntity.name}</dd>
          <dt>
            <span id="created">
              <Translate contentKey="gatewayApp.storageRecordTemplate.created">Created</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={recordTemplateEntity.created} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="updated">
              <Translate contentKey="gatewayApp.storageRecordTemplate.updated">Updated</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={recordTemplateEntity.updated} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="language">
              <Translate contentKey="gatewayApp.storageRecordTemplate.language">Language</Translate>
            </span>
          </dt>
          <dd>{recordTemplateEntity.language}</dd>
          <dt>
            <Translate contentKey="gatewayApp.storageRecordTemplate.group">Group</Translate>
          </dt>
          <dd>{recordTemplateEntity.groupId ? recordTemplateEntity.groupId : ''}</dd>
        </dl>
        <Button tag={Link} to="/record-template" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/record-template/${recordTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recordTemplate }: IRootState) => ({
  recordTemplateEntity: recordTemplate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordTemplateDetail);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecordGroup } from 'app/shared/model/storage/record-group.model';
import { getEntities as getRecordGroups } from 'app/entities/storage/record-group/record-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './record-template.reducer';
import { IRecordTemplate } from 'app/shared/model/storage/record-template.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecordTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordTemplateUpdate = (props: IRecordTemplateUpdateProps) => {
  const [groupId, setGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recordTemplateEntity, recordGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/record-template');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getRecordGroups();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.created = convertDateTimeToServer(values.created);
    values.updated = convertDateTimeToServer(values.updated);

    if (errors.length === 0) {
      const entity = {
        ...recordTemplateEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.storageRecordTemplate.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.storageRecordTemplate.home.createOrEditLabel">Create or edit a RecordTemplate</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recordTemplateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="record-template-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="record-template-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="record-template-name">
                  <Translate contentKey="gatewayApp.storageRecordTemplate.name">Name</Translate>
                </Label>
                <AvField
                  id="record-template-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 99, errorMessage: translate('entity.validation.maxlength', { max: 99 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdLabel" for="record-template-created">
                  <Translate contentKey="gatewayApp.storageRecordTemplate.created">Created</Translate>
                </Label>
                <AvInput
                  id="record-template-created"
                  type="datetime-local"
                  className="form-control"
                  name="created"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.recordTemplateEntity.created)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedLabel" for="record-template-updated">
                  <Translate contentKey="gatewayApp.storageRecordTemplate.updated">Updated</Translate>
                </Label>
                <AvInput
                  id="record-template-updated"
                  type="datetime-local"
                  className="form-control"
                  name="updated"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.recordTemplateEntity.updated)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="languageLabel" for="record-template-language">
                  <Translate contentKey="gatewayApp.storageRecordTemplate.language">Language</Translate>
                </Label>
                <AvInput
                  id="record-template-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && recordTemplateEntity.language) || 'RUSSIAN'}
                >
                  <option value="RUSSIAN">{translate('gatewayApp.Language.RUSSIAN')}</option>
                  <option value="ENGLISH">{translate('gatewayApp.Language.ENGLISH')}</option>
                  <option value="KAZAKH">{translate('gatewayApp.Language.KAZAKH')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="record-template-group">
                  <Translate contentKey="gatewayApp.storageRecordTemplate.group">Group</Translate>
                </Label>
                <AvInput id="record-template-group" type="select" className="form-control" name="groupId">
                  <option value="" key="0" />
                  {recordGroups
                    ? recordGroups.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/record-template" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  recordGroups: storeState.recordGroup.entities,
  recordTemplateEntity: storeState.recordTemplate.entity,
  loading: storeState.recordTemplate.loading,
  updating: storeState.recordTemplate.updating,
  updateSuccess: storeState.recordTemplate.updateSuccess
});

const mapDispatchToProps = {
  getRecordGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordTemplateUpdate);

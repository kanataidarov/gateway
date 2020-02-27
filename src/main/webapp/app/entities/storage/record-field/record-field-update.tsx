import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecordTemplate } from 'app/shared/model/storage/record-template.model';
import { getEntities as getRecordTemplates } from 'app/entities/storage/record-template/record-template.reducer';
import { getEntity, updateEntity, createEntity, reset } from './record-field.reducer';
import { IRecordField } from 'app/shared/model/storage/record-field.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecordFieldUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordFieldUpdate = (props: IRecordFieldUpdateProps) => {
  const [templateId, setTemplateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recordFieldEntity, recordTemplates, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/record-field');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRecordTemplates();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...recordFieldEntity,
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
          <h2 id="gatewayApp.storageRecordField.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.storageRecordField.home.createOrEditLabel">Create or edit a RecordField</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recordFieldEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="record-field-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="record-field-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="record-field-name">
                  <Translate contentKey="gatewayApp.storageRecordField.name">Name</Translate>
                </Label>
                <AvField
                  id="record-field-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 99, errorMessage: translate('entity.validation.maxlength', { max: 99 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="record-field-description">
                  <Translate contentKey="gatewayApp.storageRecordField.description">Description</Translate>
                </Label>
                <AvField
                  id="record-field-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 299, errorMessage: translate('entity.validation.maxlength', { max: 299 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="record-field-template">
                  <Translate contentKey="gatewayApp.storageRecordField.template">Template</Translate>
                </Label>
                <AvInput id="record-field-template" type="select" className="form-control" name="templateId">
                  <option value="" key="0" />
                  {recordTemplates
                    ? recordTemplates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/record-field" replace color="info">
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
  recordTemplates: storeState.recordTemplate.entities,
  recordFieldEntity: storeState.recordField.entity,
  loading: storeState.recordField.loading,
  updating: storeState.recordField.updating,
  updateSuccess: storeState.recordField.updateSuccess
});

const mapDispatchToProps = {
  getRecordTemplates,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordFieldUpdate);

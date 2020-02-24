import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecord } from 'app/shared/model/storage/record.model';
import { getEntities as getRecords } from 'app/entities/storage/record/record.reducer';
import { IRecordField } from 'app/shared/model/storage/record-field.model';
import { getEntities as getRecordFields } from 'app/entities/storage/record-field/record-field.reducer';
import { getEntity, updateEntity, createEntity, reset } from './record-value.reducer';
import { IRecordValue } from 'app/shared/model/storage/record-value.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecordValueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordValueUpdate = (props: IRecordValueUpdateProps) => {
  const [recordId, setRecordId] = useState('0');
  const [fieldId, setFieldId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recordValueEntity, records, recordFields, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/record-value');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRecords();
    props.getRecordFields();
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
        ...recordValueEntity,
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
          <h2 id="gatewayApp.storageRecordValue.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.storageRecordValue.home.createOrEditLabel">Create or edit a RecordValue</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recordValueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="record-value-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="record-value-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="valueLabel" for="record-value-value">
                  <Translate contentKey="gatewayApp.storageRecordValue.value">Value</Translate>
                </Label>
                <AvField
                  id="record-value-value"
                  type="text"
                  name="value"
                  validate={{
                    maxLength: { value: 299, errorMessage: translate('entity.validation.maxlength', { max: 299 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdLabel" for="record-value-created">
                  <Translate contentKey="gatewayApp.storageRecordValue.created">Created</Translate>
                </Label>
                <AvInput
                  id="record-value-created"
                  type="datetime-local"
                  className="form-control"
                  name="created"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.recordValueEntity.created)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedLabel" for="record-value-updated">
                  <Translate contentKey="gatewayApp.storageRecordValue.updated">Updated</Translate>
                </Label>
                <AvInput
                  id="record-value-updated"
                  type="datetime-local"
                  className="form-control"
                  name="updated"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.recordValueEntity.updated)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="record-value-record">
                  <Translate contentKey="gatewayApp.storageRecordValue.record">Record</Translate>
                </Label>
                <AvInput id="record-value-record" type="select" className="form-control" name="recordId">
                  <option value="" key="0" />
                  {records
                    ? records.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="record-value-field">
                  <Translate contentKey="gatewayApp.storageRecordValue.field">Field</Translate>
                </Label>
                <AvInput id="record-value-field" type="select" className="form-control" name="fieldId">
                  <option value="" key="0" />
                  {recordFields
                    ? recordFields.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/record-value" replace color="info">
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
  records: storeState.record.entities,
  recordFields: storeState.recordField.entities,
  recordValueEntity: storeState.recordValue.entity,
  loading: storeState.recordValue.loading,
  updating: storeState.recordValue.updating,
  updateSuccess: storeState.recordValue.updateSuccess
});

const mapDispatchToProps = {
  getRecords,
  getRecordFields,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordValueUpdate);

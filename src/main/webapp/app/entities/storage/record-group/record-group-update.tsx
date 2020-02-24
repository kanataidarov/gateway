import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './record-group.reducer';
import { IRecordGroup } from 'app/shared/model/storage/record-group.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecordGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecordGroupUpdate = (props: IRecordGroupUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recordGroupEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/record-group');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...recordGroupEntity,
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
          <h2 id="gatewayApp.storageRecordGroup.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.storageRecordGroup.home.createOrEditLabel">Create or edit a RecordGroup</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recordGroupEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="record-group-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="record-group-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="record-group-name">
                  <Translate contentKey="gatewayApp.storageRecordGroup.name">Name</Translate>
                </Label>
                <AvField
                  id="record-group-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 99, errorMessage: translate('entity.validation.maxlength', { max: 99 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="record-group-type">
                  <Translate contentKey="gatewayApp.storageRecordGroup.type">Type</Translate>
                </Label>
                <AvInput
                  id="record-group-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && recordGroupEntity.type) || 'SURVEY'}
                >
                  <option value="SURVEY">{translate('gatewayApp.RecordType.SURVEY')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/record-group" replace color="info">
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
  recordGroupEntity: storeState.recordGroup.entity,
  loading: storeState.recordGroup.loading,
  updating: storeState.recordGroup.updating,
  updateSuccess: storeState.recordGroup.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordGroupUpdate);

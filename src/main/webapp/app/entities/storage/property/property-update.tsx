import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPropertyGroup } from 'app/shared/model/storage/property-group.model';
import { getEntities as getPropertyGroups } from 'app/entities/storage/property-group/property-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './property.reducer';
import { IProperty } from 'app/shared/model/storage/property.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPropertyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropertyUpdate = (props: IPropertyUpdateProps) => {
  const [groupId, setGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { propertyEntity, propertyGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/property' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPropertyGroups();
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
        ...propertyEntity,
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
          <h2 id="gatewayApp.storageProperty.home.createOrEditLabel">
            <Translate contentKey="gatewayApp.storageProperty.home.createOrEditLabel">Create or edit a Property</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : propertyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="property-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="property-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="property-name">
                  <Translate contentKey="gatewayApp.storageProperty.name">Name</Translate>
                </Label>
                <AvField
                  id="property-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 99, errorMessage: translate('entity.validation.maxlength', { max: 99 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdLabel" for="property-created">
                  <Translate contentKey="gatewayApp.storageProperty.created">Created</Translate>
                </Label>
                <AvInput
                  id="property-created"
                  type="datetime-local"
                  className="form-control"
                  name="created"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.propertyEntity.created)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedLabel" for="property-updated">
                  <Translate contentKey="gatewayApp.storageProperty.updated">Updated</Translate>
                </Label>
                <AvInput
                  id="property-updated"
                  type="datetime-local"
                  className="form-control"
                  name="updated"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.propertyEntity.updated)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="property-group">
                  <Translate contentKey="gatewayApp.storageProperty.group">Group</Translate>
                </Label>
                <AvInput id="property-group" type="select" className="form-control" name="groupId">
                  <option value="" key="0" />
                  {propertyGroups
                    ? propertyGroups.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/property" replace color="info">
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
  propertyGroups: storeState.propertyGroup.entities,
  propertyEntity: storeState.property.entity,
  loading: storeState.property.loading,
  updating: storeState.property.updating,
  updateSuccess: storeState.property.updateSuccess
});

const mapDispatchToProps = {
  getPropertyGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropertyUpdate);

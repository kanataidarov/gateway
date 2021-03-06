import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './record-value.reducer';
import { IRecordValue } from 'app/shared/model/storage/record-value.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecordValueProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RecordValue = (props: IRecordValueProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, [search]);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
  };

  const handleSearch = event => setSearch(event.target.value);

  const { recordValueList, match, loading } = props;
  return (
    <div>
      <h2 id="record-value-heading">
        <Translate contentKey="gatewayApp.storageRecordValue.home.title">Record Values</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gatewayApp.storageRecordValue.home.createLabel">Create new Record Value</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('gatewayApp.storageRecordValue.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {recordValueList && recordValueList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.storageRecordValue.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.storageRecordValue.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.storageRecordValue.updated">Updated</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.storageRecordValue.record">Record</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.storageRecordValue.field">Field</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recordValueList.map((recordValue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${recordValue.id}`} color="link" size="sm">
                      {recordValue.id}
                    </Button>
                  </td>
                  <td>{recordValue.value}</td>
                  <td>
                    <TextFormat type="date" value={recordValue.created} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={recordValue.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{recordValue.recordId ? <Link to={`record/${recordValue.recordId}`}>{recordValue.recordId}</Link> : ''}</td>
                  <td>{recordValue.fieldId ? <Link to={`record-field/${recordValue.fieldId}`}>{recordValue.fieldId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${recordValue.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recordValue.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recordValue.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gatewayApp.storageRecordValue.home.notFound">No Record Values found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ recordValue }: IRootState) => ({
  recordValueList: recordValue.entities,
  loading: recordValue.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecordValue);

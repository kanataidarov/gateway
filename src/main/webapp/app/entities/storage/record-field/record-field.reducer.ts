import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IRecordField, defaultValue } from 'app/shared/model/storage/record-field.model';

export const ACTION_TYPES = {
  SEARCH_RECORDFIELDS: 'recordField/SEARCH_RECORDFIELDS',
  FETCH_RECORDFIELD_LIST: 'recordField/FETCH_RECORDFIELD_LIST',
  FETCH_RECORDFIELD: 'recordField/FETCH_RECORDFIELD',
  CREATE_RECORDFIELD: 'recordField/CREATE_RECORDFIELD',
  UPDATE_RECORDFIELD: 'recordField/UPDATE_RECORDFIELD',
  DELETE_RECORDFIELD: 'recordField/DELETE_RECORDFIELD',
  RESET: 'recordField/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecordField>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RecordFieldState = Readonly<typeof initialState>;

// Reducer

export default (state: RecordFieldState = initialState, action): RecordFieldState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECORDFIELDS):
    case REQUEST(ACTION_TYPES.FETCH_RECORDFIELD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECORDFIELD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECORDFIELD):
    case REQUEST(ACTION_TYPES.UPDATE_RECORDFIELD):
    case REQUEST(ACTION_TYPES.DELETE_RECORDFIELD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECORDFIELDS):
    case FAILURE(ACTION_TYPES.FETCH_RECORDFIELD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECORDFIELD):
    case FAILURE(ACTION_TYPES.CREATE_RECORDFIELD):
    case FAILURE(ACTION_TYPES.UPDATE_RECORDFIELD):
    case FAILURE(ACTION_TYPES.DELETE_RECORDFIELD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECORDFIELDS):
    case SUCCESS(ACTION_TYPES.FETCH_RECORDFIELD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECORDFIELD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECORDFIELD):
    case SUCCESS(ACTION_TYPES.UPDATE_RECORDFIELD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECORDFIELD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'services/storage/api/record-fields';
const apiSearchUrl = 'services/storage/api/_search/record-fields';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecordField> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECORDFIELDS,
  payload: axios.get<IRecordField>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IRecordField> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECORDFIELD_LIST,
  payload: axios.get<IRecordField>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRecordField> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDFIELD,
    payload: axios.get<IRecordField>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecordField> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECORDFIELD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecordField> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECORDFIELD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecordField> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECORDFIELD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

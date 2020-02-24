import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecordValue, defaultValue } from 'app/shared/model/storage/record-value.model';

export const ACTION_TYPES = {
  SEARCH_RECORDVALUES: 'recordValue/SEARCH_RECORDVALUES',
  FETCH_RECORDVALUE_LIST: 'recordValue/FETCH_RECORDVALUE_LIST',
  FETCH_RECORDVALUE: 'recordValue/FETCH_RECORDVALUE',
  CREATE_RECORDVALUE: 'recordValue/CREATE_RECORDVALUE',
  UPDATE_RECORDVALUE: 'recordValue/UPDATE_RECORDVALUE',
  DELETE_RECORDVALUE: 'recordValue/DELETE_RECORDVALUE',
  RESET: 'recordValue/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecordValue>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RecordValueState = Readonly<typeof initialState>;

// Reducer

export default (state: RecordValueState = initialState, action): RecordValueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECORDVALUES):
    case REQUEST(ACTION_TYPES.FETCH_RECORDVALUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECORDVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECORDVALUE):
    case REQUEST(ACTION_TYPES.UPDATE_RECORDVALUE):
    case REQUEST(ACTION_TYPES.DELETE_RECORDVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECORDVALUES):
    case FAILURE(ACTION_TYPES.FETCH_RECORDVALUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECORDVALUE):
    case FAILURE(ACTION_TYPES.CREATE_RECORDVALUE):
    case FAILURE(ACTION_TYPES.UPDATE_RECORDVALUE):
    case FAILURE(ACTION_TYPES.DELETE_RECORDVALUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECORDVALUES):
    case SUCCESS(ACTION_TYPES.FETCH_RECORDVALUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECORDVALUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECORDVALUE):
    case SUCCESS(ACTION_TYPES.UPDATE_RECORDVALUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECORDVALUE):
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

const apiUrl = 'services/storage/api/record-values';
const apiSearchUrl = 'services/storage/api/_search/record-values';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecordValue> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECORDVALUES,
  payload: axios.get<IRecordValue>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IRecordValue> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECORDVALUE_LIST,
  payload: axios.get<IRecordValue>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRecordValue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDVALUE,
    payload: axios.get<IRecordValue>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecordValue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECORDVALUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecordValue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECORDVALUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecordValue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECORDVALUE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

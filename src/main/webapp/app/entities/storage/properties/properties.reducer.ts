import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProperties, defaultValue } from 'app/shared/model/storage/properties.model';

export const ACTION_TYPES = {
  SEARCH_PROPERTIES: 'properties/SEARCH_PROPERTIES',
  FETCH_PROPERTIES_LIST: 'properties/FETCH_PROPERTIES_LIST',
  FETCH_PROPERTIES: 'properties/FETCH_PROPERTIES',
  CREATE_PROPERTIES: 'properties/CREATE_PROPERTIES',
  UPDATE_PROPERTIES: 'properties/UPDATE_PROPERTIES',
  DELETE_PROPERTIES: 'properties/DELETE_PROPERTIES',
  RESET: 'properties/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProperties>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PropertiesState = Readonly<typeof initialState>;

// Reducer

export default (state: PropertiesState = initialState, action): PropertiesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PROPERTIES):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTIES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPERTIES):
    case REQUEST(ACTION_TYPES.UPDATE_PROPERTIES):
    case REQUEST(ACTION_TYPES.DELETE_PROPERTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PROPERTIES):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTIES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTIES):
    case FAILURE(ACTION_TYPES.CREATE_PROPERTIES):
    case FAILURE(ACTION_TYPES.UPDATE_PROPERTIES):
    case FAILURE(ACTION_TYPES.DELETE_PROPERTIES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PROPERTIES):
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTIES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPERTIES):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPERTIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPERTIES):
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

const apiUrl = 'services/storage/api/properties';
const apiSearchUrl = 'services/storage/api/_search/properties';

// Actions

export const getSearchEntities: ICrudSearchAction<IProperties> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PROPERTIES,
  payload: axios.get<IProperties>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IProperties> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROPERTIES_LIST,
  payload: axios.get<IProperties>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProperties> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTIES,
    payload: axios.get<IProperties>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProperties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPERTIES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProperties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPERTIES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProperties> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPERTIES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

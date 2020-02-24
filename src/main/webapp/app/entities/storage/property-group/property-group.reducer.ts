import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IPropertyGroup, defaultValue } from 'app/shared/model/storage/property-group.model';

export const ACTION_TYPES = {
  SEARCH_PROPERTYGROUPS: 'propertyGroup/SEARCH_PROPERTYGROUPS',
  FETCH_PROPERTYGROUP_LIST: 'propertyGroup/FETCH_PROPERTYGROUP_LIST',
  FETCH_PROPERTYGROUP: 'propertyGroup/FETCH_PROPERTYGROUP',
  CREATE_PROPERTYGROUP: 'propertyGroup/CREATE_PROPERTYGROUP',
  UPDATE_PROPERTYGROUP: 'propertyGroup/UPDATE_PROPERTYGROUP',
  DELETE_PROPERTYGROUP: 'propertyGroup/DELETE_PROPERTYGROUP',
  RESET: 'propertyGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPropertyGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PropertyGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: PropertyGroupState = initialState, action): PropertyGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PROPERTYGROUPS):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPERTYGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_PROPERTYGROUP):
    case REQUEST(ACTION_TYPES.DELETE_PROPERTYGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PROPERTYGROUPS):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYGROUP):
    case FAILURE(ACTION_TYPES.CREATE_PROPERTYGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_PROPERTYGROUP):
    case FAILURE(ACTION_TYPES.DELETE_PROPERTYGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PROPERTYGROUPS):
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPERTYGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPERTYGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPERTYGROUP):
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

const apiUrl = 'services/storage/api/property-groups';
const apiSearchUrl = 'services/storage/api/_search/property-groups';

// Actions

export const getSearchEntities: ICrudSearchAction<IPropertyGroup> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PROPERTYGROUPS,
  payload: axios.get<IPropertyGroup>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IPropertyGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROPERTYGROUP_LIST,
  payload: axios.get<IPropertyGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPropertyGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTYGROUP,
    payload: axios.get<IPropertyGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPropertyGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPERTYGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPropertyGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPERTYGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPropertyGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPERTYGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

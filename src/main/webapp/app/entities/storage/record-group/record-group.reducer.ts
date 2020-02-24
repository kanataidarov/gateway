import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IRecordGroup, defaultValue } from 'app/shared/model/storage/record-group.model';

export const ACTION_TYPES = {
  SEARCH_RECORDGROUPS: 'recordGroup/SEARCH_RECORDGROUPS',
  FETCH_RECORDGROUP_LIST: 'recordGroup/FETCH_RECORDGROUP_LIST',
  FETCH_RECORDGROUP: 'recordGroup/FETCH_RECORDGROUP',
  CREATE_RECORDGROUP: 'recordGroup/CREATE_RECORDGROUP',
  UPDATE_RECORDGROUP: 'recordGroup/UPDATE_RECORDGROUP',
  DELETE_RECORDGROUP: 'recordGroup/DELETE_RECORDGROUP',
  RESET: 'recordGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecordGroup>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecordGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: RecordGroupState = initialState, action): RecordGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECORDGROUPS):
    case REQUEST(ACTION_TYPES.FETCH_RECORDGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECORDGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECORDGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_RECORDGROUP):
    case REQUEST(ACTION_TYPES.DELETE_RECORDGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECORDGROUPS):
    case FAILURE(ACTION_TYPES.FETCH_RECORDGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECORDGROUP):
    case FAILURE(ACTION_TYPES.CREATE_RECORDGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_RECORDGROUP):
    case FAILURE(ACTION_TYPES.DELETE_RECORDGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECORDGROUPS):
    case SUCCESS(ACTION_TYPES.FETCH_RECORDGROUP_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECORDGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECORDGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_RECORDGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECORDGROUP):
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

const apiUrl = 'services/storage/api/record-groups';
const apiSearchUrl = 'services/storage/api/_search/record-groups';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecordGroup> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECORDGROUPS,
  payload: axios.get<IRecordGroup>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IRecordGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDGROUP_LIST,
    payload: axios.get<IRecordGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecordGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDGROUP,
    payload: axios.get<IRecordGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecordGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECORDGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRecordGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECORDGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecordGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECORDGROUP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

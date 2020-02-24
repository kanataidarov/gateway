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

import { IRecordTemplate, defaultValue } from 'app/shared/model/storage/record-template.model';

export const ACTION_TYPES = {
  SEARCH_RECORDTEMPLATES: 'recordTemplate/SEARCH_RECORDTEMPLATES',
  FETCH_RECORDTEMPLATE_LIST: 'recordTemplate/FETCH_RECORDTEMPLATE_LIST',
  FETCH_RECORDTEMPLATE: 'recordTemplate/FETCH_RECORDTEMPLATE',
  CREATE_RECORDTEMPLATE: 'recordTemplate/CREATE_RECORDTEMPLATE',
  UPDATE_RECORDTEMPLATE: 'recordTemplate/UPDATE_RECORDTEMPLATE',
  DELETE_RECORDTEMPLATE: 'recordTemplate/DELETE_RECORDTEMPLATE',
  RESET: 'recordTemplate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecordTemplate>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecordTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: RecordTemplateState = initialState, action): RecordTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECORDTEMPLATES):
    case REQUEST(ACTION_TYPES.FETCH_RECORDTEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECORDTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECORDTEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_RECORDTEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_RECORDTEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECORDTEMPLATES):
    case FAILURE(ACTION_TYPES.FETCH_RECORDTEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECORDTEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_RECORDTEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_RECORDTEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_RECORDTEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECORDTEMPLATES):
    case SUCCESS(ACTION_TYPES.FETCH_RECORDTEMPLATE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_RECORDTEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECORDTEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_RECORDTEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECORDTEMPLATE):
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

const apiUrl = 'services/storage/api/record-templates';
const apiSearchUrl = 'services/storage/api/_search/record-templates';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecordTemplate> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_RECORDTEMPLATES,
  payload: axios.get<IRecordTemplate>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IRecordTemplate> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDTEMPLATE_LIST,
    payload: axios.get<IRecordTemplate>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecordTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECORDTEMPLATE,
    payload: axios.get<IRecordTemplate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecordTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECORDTEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRecordTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECORDTEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecordTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECORDTEMPLATE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

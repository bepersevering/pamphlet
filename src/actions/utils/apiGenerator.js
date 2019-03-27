import _ from 'lodash';
import qs from 'qs';

import axios from './http';

const getMethodType = function(api) {
  if (api.method && [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ].includes(api.method)) {
    return api.method;
  }
  let method;
  if (api.name.startsWith('get')) {
    method = 'GET';
  } else if (api.name.startsWith('create')) {
    method = 'POST';
  } else if (api.name.startsWith('update')) {
    method = 'PUT';
  } else if (api.name.startsWith('delete')) {
    method = 'DELETE';
  } else {
    throw new Error('method name is defined must be start with "get, create, update, delete"');
  }
  return method;
};

const getPathParams = function(url) {
  const regex = /{([^}]+)}/g;
  const pathParams = [];
  let currentMatch;
  while ((currentMatch = regex.exec(url))) {
    pathParams.push(currentMatch[1]);
  }
  return pathParams;
};

const prepareAjaxMethod = (api) => (options = {}) => {
  const method = getMethodType(api);
  const pathParams = getPathParams(api.url);
  let newUrl = pathParams.reduce((url, pathParam) => {
    const paramVal = options.pathParams[pathParam];
    if (paramVal) {
      return url.replace(`{${pathParam}}`, paramVal);
    }
    throw new Error(`${url} has invalid path params.`);
  }, api.url);

  if (!_.isEmpty(options.queryParams)) {
    newUrl = `${newUrl}?${qs.stringify(options.queryParams)}`;
  }
  // hack for axios headers
  if (_.isUndefined(options.data)) { options.data = {}; }
  Reflect.deleteProperty(options, 'pathParams');
  Reflect.deleteProperty(options, 'queryParams');

  options = _.merge(
    {
      url: newUrl,
      method
    },
    options
  );

  return axios(options);
};

export const generate = function(apiObj) {
  _.forIn(apiObj, (v, k) => {
    if (Object.keys(v).length > 0) {
      const newVal = {};
      v.forEach((api) => {
        newVal[api.name] = prepareAjaxMethod(api);
      });
      apiObj[k] = newVal;
    }
  });
  return apiObj;
};

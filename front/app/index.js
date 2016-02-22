import views from 'root/views';
import router from 'root/router';

var App = Vue.extend({
	template: views['layout/layout']
});

Vue.config.debug = true

var defaults = function(obj, source) {
  for (var prop in source) {
    if (obj[prop] === undefined) obj[prop] = source[prop];
  }
  return obj;
}

var stringifyGETParams = function(url, data) {
  var query = '';
  for (var key in data) {
    if (data[key] == null) continue;
    query += '&'
      + encodeURIComponent(key) + '='
      + encodeURIComponent(data[key]);
  }
  if (query) url += (~url.indexOf('?') ? '&' : '?') + query.substring(1);
  return url;
}

var status = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
}

var json = function(response) {
  return response.json()
}

Backbone.ajax = function(options) {
  if (options.type === 'GET' && typeof options.data === 'object') {
    options.url = stringifyGETParams(options.url, options.data);
  }

  return fetch(options.url, defaults(options, {
    method: options.type,
    headers: defaults(options.headers || {}, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: options.data
  }))
  .then(status)
  .then(json)
  .then(options.success)
  .catch(options.error);
};

router.start(App, '#app');
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: me_vars.rootURL + '/'
});

Router.map(function() {
  this.route('module', {path: '/'});
  this.route('notes', function() {
    this.route('show', {path: '/:id'});
    this.route('new');
  });
});

export default Router;

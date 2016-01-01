import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Revue from 'revue'
import store from 'stores/store'
import views from 'views';
import Editor from 'components/editor/index';
import router from 'router';

Vue.component('editor', Editor);

Vue.use(VueResource);
Vue.use(Revue, {
    store
});



var App = Vue.extend({
	template: views['layout/layout']
});


router.start(App, '#app');
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Revue from 'revue';
import store from 'root/stores/store';
import views from 'root/views';
import Editor from 'root/components/editor/index';
import router from 'root/router';

Vue.component('editor', Editor);

var App = Vue.extend({
	template: views['layout/layout']
});

Vue.use(VueResource);
Vue.use(Revue, {
    store
});




router.start(App, '#app');
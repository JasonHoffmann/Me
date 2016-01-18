import views from 'root/views';
import Editor from 'root/components/editor/index';
import router from 'root/router';

Vue.component('editor', Editor);

var App = Vue.extend({
	template: '<div><router-view></router-view></div>'
});

Vue.use(VueResource);


router.start(App, '#app');
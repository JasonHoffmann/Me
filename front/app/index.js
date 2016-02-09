import views from 'root/views';
import router from 'root/router';

var App = Vue.extend({
	template: views['layout/layout']
});

Vue.use(VueResource);


router.start(App, '#app');
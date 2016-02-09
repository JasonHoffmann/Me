import Sections from 'root/sections/index';
import Notes from 'root/sections/notes/index';

Vue.use(VueRouter);
var router = new VueRouter();

router.map({
    '/': {
        component: Sections
    },

    '/notes' : {
    	component: Notes
    }
});

export default router;
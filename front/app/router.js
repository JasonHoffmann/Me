import Sections from 'root/sections/index';
import Notes from 'root/sections/notes/index';
import Notes_Edit from 'root/sections/notes/edit';

Vue.use(VueRouter);
var router = new VueRouter();

router.map({
    '/': {
        component: Sections
    },

    '/notes' : {
    	component: Notes
    },

    '/notes/edit/:id' : {
        name : 'edit_note',
    	component: Notes_Edit
    }
});

export default router;
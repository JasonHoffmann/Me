import Vue from 'vue';
import VueRouter from 'vue-router';
import Sections from 'sections/index';
import Notes from 'sections/notes/index/';
import Notes_Edit from 'sections/notes/edit';

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
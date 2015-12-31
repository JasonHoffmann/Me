import { combineReducers } from 'redux';

var merge = function(arr1, arr2) {
	var arr3 = [];
	for(var i in arr1){
	   var shared = false;
	   for (var j in arr2)
	       if (arr2[j].name == arr1[i].name) {
	           shared = true;
	           break;
	       }
	   if(!shared) arr3.push(arr1[i])
	}
	arr3 = arr3.concat(arr2);
	return arr3;
}


var active_sections = function active_sections( state = {}, action ) {
	switch (action.type) {
		case 'GET_ACTIVE_SECTIONS' :
		    var active_sections = action.sections.filter(function(section) {
				return section.activated === true;
			});
			return Object.assign({}, state, active_sections);
		default :
			return state
	}
}

var sections = function sections( state = {}, action ) {
	switch (action.type) {
		case 'GET_SECTIONS_SUCCESS' :
			return Object.assign({}, state, action.sections);
		default :
			return state
	}
}

var notes = function notes(state = [], action) {
	switch (action.type) {
		case 'GET_NOTES' :
			return merge(state, action.notes);
		case 'ADD_NOTE' :
			return merge(state, [action.note]);
		case 'UPDATE_NOTE' :
			return merge(state, [action.note]);
		default :
			return state;
	}
}

var note = function note(state = {}, action) {
	switch (action.type) {
		case 'GET_NOTE' :
			return Object.assign({}, state, action.note);
		default :
			return state;
	}
}

export default combineReducers({
	sections,
	active_sections,
	notes,
	note
})
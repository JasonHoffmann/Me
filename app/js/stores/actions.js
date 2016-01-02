import api from 'root/api/index';
import Vue from 'vue';
import router from 'root/router';

const GET_SECTIONS_SUCCESS = 'GET_SECTIONS_SUCCESS';
const GET_ACTIVE_SECTIONS = 'GET_ACTIVE_SECTIONS';

export function getSections() {
	return function(dispatch) {
		return api.get_sections().then(function(response) {
			return dispatch({ type: GET_ACTIVE_SECTIONS, sections: response.data } );
			return dispatch({ type: GET_SECTIONS_SUCCESS, active_sections : response.data } );
		})
	}
}

const GET_NOTES = 'GET_NOTES';
const GET_NOTE = 'GET_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const ADD_NOTE = 'ADD_NOTE';

export function getNotes() {
	return function(dispatch) {
		return api.get_notes().then(function(response) {
			return dispatch({ type: GET_NOTES, notes: response.data } );
		})
	}
}

export function getNote(id) {
	return function(dispatch) {
		return api.get_note(id).then(function(response) {
			return dispatch({ type: GET_NOTE, note: response.data } );
		})
	}
}

export function updateNote(id, note) {
	return function(dispatch) {
		return api.edit_note(id, note).then(function() {
			return dispatch({ type: UPDATE_NOTE, note: note } );
		})
	}
}

export function deleteNote(id) {
	return function(dispatch) {
		return api.delete_note(id).then(function() {
			return dispatch({ type: DELETE_NOTE, id: id } );
		})
	}
}

export function addNote(note = { title: 'Get Started!'} ) {
	return function(dispatch) {
		return api.add_note(note).then(function(response) {
			router.go({ name: 'edit_note', params: { id: response.data.ID }});
			return dispatch({ type: ADD_NOTE, note: response.data } );
		})
	}
}
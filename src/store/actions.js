import * as types from './actionTypes';

export const create = (index) => ({
    type: types.CREATE,
    payload: {
        index
    }
});

export const update = (index, content) => ({
    type: types.UPDATE,
    payload: {
        index,
        content
    }
});

export const toggleComplete = (index) => ({
    type: types.TOGGLE_COMPLETE,
    payload: {
        index
    }
});

export const deleteTodo = (index) => ({
    type: types.DELETE,
    payload: {
        index
    }
});

export const archive = (index) => ({
    type: types.ARCHIVE,
    payload: {
        index,
    }
});
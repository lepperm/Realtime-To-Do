import * as types from './actionTypes';

const initialState = {
    todos:
    [{
        content: '',
        isCompleted: false,
        isArchived: false
    }]
};

const reducer = (state = initialState, action) => {
    let newTodos = state.todos;

    switch(action.type) {
        case types.CREATE:
            newTodos.splice(action.payload.index + 1, 0, {
                content: '',
                isCompleted: false,
                isArchived: false
            });
            return {...state, todos: newTodos}

        case types.UPDATE:
            newTodos[action.payload.index].content = action.payload.content;
            return {...state, todos: newTodos}

        case types.TOGGLE_COMPLETE:
            newTodos[action.payload.index].isCompleted = !newTodos[action.payload.index].isCompleted;
            return {...state, todos: newTodos}

        case types.DELETE:
            if (action.payload.index === 0 && newTodos.length === 1) return state;
            let delTodos = newTodos.slice(0, action.payload.index).concat(newTodos.slice(action.payload.index + 1, newTodos.length));
            return {...state, todos: delTodos}

        case types.ARCHIVE:
            newTodos[action.payload.index].isArchived = !newTodos[action.payload.index].isArchived;
            return {...state, todos: newTodos}

        default:
            return state;
    }
}

export default reducer;
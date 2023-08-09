import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending',
}


const state = {
    todos: [
        new Todo('task 1'),
        new Todo('task 2'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🍕');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
};

const saveStateTolocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Option ${filter} is not valid.`)
    }

};

const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStateTolocalStorage()
};

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateTolocalStorage();
};

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateTolocalStorage();
};

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateTolocalStorage();
};

const getCurrentFilter = () => {
    return state.filter;
};




export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    setFilter,
    toggleTodo,
    loadStore,
}
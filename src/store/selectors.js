export const getTodos = (state) => {
  return state.todos
    .filter((todo) => todo.isArchived === false)
    .sort((a, b) => (a.position > b.position ? 1 : -1)); // Sort incoming todos by position
};

import TodoItem from './TodoItem';
 
const TodoList = ({ todos, onDelete, onToggle }) => {
  if (todos.length === 0) {
    return (
      <p style={{
        textAlign: 'center',
        color: 'rgba(240,237,255,0.4)',
        padding: '20px 0',
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
      }}>
        Nothing here yet... add something! ✨
      </p>
    );
  }
 
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {todos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={i}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};
 
export default TodoList;
 
import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React fundamentals', completed: false },
    { id: 2, text: 'Build a Todo App with Tailwind', completed: false },
    { id: 3, text: 'Become a Product Manajer', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D1A',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '48px 16px 80px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'fixed', top: '-80px', left: '-100px',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,47,190,0.35), transparent 70%)',
        filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '40px', right: '-80px',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,214,160,0.25), transparent 70%)',
        filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '460px',
        background: '#13132B',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '28px',
        padding: '40px 36px 32px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '40px', right: '40px',
          height: '3px',
          background: 'linear-gradient(90deg, #FF4D6D, #FFD166, #06D6A0)',
          borderRadius: '0 0 8px 8px',
        }} />

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '2rem', fontWeight: 800,
          textAlign: 'center', letterSpacing: '-0.5px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, #fff 30%, #06D6A0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ✦ To-Do List
        </h1>

        <TodoInput onAdd={addTodo} />

        <div style={{ marginTop: '28px' }}>
          <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
        </div>

        {todos.length > 0 && (
          <div style={{
            marginTop: '24px', paddingTop: '18px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #FFD166, #ffb347)',
              color: '#0D0D1A', fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: '0.7rem',
              padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em',
            }}>
              {todos.filter(t => t.completed).length}
            </span>
            <span style={{
              fontSize: '0.75rem', fontFamily: "'Syne', sans-serif",
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(240,237,255,0.4)',
            }}>of</span>
            <span style={{
              background: 'linear-gradient(135deg, #FFD166, #ffb347)',
              color: '#0D0D1A', fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: '0.7rem',
              padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em',
            }}>
              {todos.length}
            </span>
            <span style={{
              fontSize: '0.75rem', fontFamily: "'Syne', sans-serif",
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(240,237,255,0.4)',
            }}>tasks done</span>
          </div>
        )}
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
    </div>
  );
};

export default App;
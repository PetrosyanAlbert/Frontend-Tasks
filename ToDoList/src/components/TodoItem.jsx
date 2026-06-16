import { useState } from 'react';

const TodoItem = ({ todo, onDelete, onToggle, index }) => {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        background: todo.completed
          ? 'rgba(6,214,160,0.06)'
          : hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${
          todo.completed
            ? 'rgba(6,214,160,0.18)'
            : hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'
        }`,
        borderRadius: '16px',
        transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        <div
          onClick={() => onToggle(todo.id)}
          style={{
            width: '22px', height: '22px', borderRadius: '7px',
            border: `2px solid ${todo.completed ? '#06D6A0' : 'rgba(255,255,255,0.2)'}`,
            background: todo.completed ? '#06D6A0' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            transition: 'background 0.2s, border-color 0.2s',
          }}
        >
          {todo.completed && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1" stroke="#0D0D1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <span style={{
          fontSize: '0.95rem',
          color: todo.completed ? 'rgba(240,237,255,0.4)' : '#F0EDFF',
          textDecoration: todo.completed ? 'line-through' : 'none',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          transition: 'color 0.2s',
        }}>
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        aria-label="Delete todo"
        style={{
          background: btnHovered ? 'rgba(255,77,109,0.12)' : 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px', borderRadius: '10px',
          color: btnHovered ? '#FF4D6D' : 'rgba(255,77,109,0.6)',
          transform: btnHovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'color 0.2s, background 0.2s, transform 0.15s',
          flexShrink: 0, display: 'flex',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
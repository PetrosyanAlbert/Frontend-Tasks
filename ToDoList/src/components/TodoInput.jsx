import { useState } from "react";

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          background: focused ? 'rgba(6,214,160,0.07)' : 'rgba(255,255,255,0.06)',
          border: `1.5px solid ${focused ? '#06D6A0' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: '14px',
          padding: '12px 18px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.95rem',
          color: '#F0EDFF',
          outline: 'none',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      />
      <button
        type="submit"
        style={{
          background: 'linear-gradient(135deg, #FF4D6D, #ff6b35)',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          padding: '12px 22px',
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255,77,109,0.4)',
          whiteSpace: 'nowrap',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 28px rgba(255,77,109,0.55)';
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 20px rgba(255,77,109,0.4)';
        }}
      >
        + Add
      </button>
    </form>
  );
};

export default TodoInput;
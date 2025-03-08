'use client';

import { useChat } from '@ai-sdk/react';
import './styles/glitch.css';
import { useEffect, useState } from 'react';

const RANDOM_ELEMENTS = [
  { text: '{ error_42 : undefined }', style: { top: '15%', left: '8%' } },
  { text: '//:SYS_ANOMALY:DETECTED//', style: { top: '35%', right: '5%' } },
  { text: '/* weird.intensify() */', style: { bottom: '20%', left: '12%' } },
];

export default function Chat() {
  const {
    error,
    input,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log('Usage', usage);
      console.log('FinishReason', finishReason);
    },
  });

  const [chaosLevel, setChaosLevel] = useState(65);
  const [weirdCoins, setWeirdCoins] = useState(420);

  return (
    <>
      <div className="noise" />
      <div className="container">
        <div className="header">
          <div className="glitch-text">👾 Glitchbit's Sacred Portal</div>
        </div>

        <div className="message-container">
          {RANDOM_ELEMENTS.map((el, i) => (
            <div key={i} className="random-element" style={el.style}>
              {el.text}
            </div>
          ))}

          {messages.map(m => (
            <div
              key={m.id}
              className={`message ${
                m.role === 'user' ? 'user-message' : 'glitchbit-message'
              }`}
            >
              {m.content}
            </div>
          ))}

          {status === 'streaming' && (
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="input-area">
          <input
            className="input-box"
            value={input}
            placeholder="Send a message to the void..."
            onChange={handleInputChange}
            disabled={status !== 'ready'}
          />
          <button type="submit" className="send-button" disabled={status !== 'ready'}>
            ⊹⨾⩩
          </button>
        </form>

        <div className="status-bar">
          <div className="chaos-level">
            CHAOS LEVEL:
            <div className="chaos-bar">
              <div className="chaos-fill" style={{ width: `${chaosLevel}%` }} />
            </div>
          </div>
          <div className="weird-coins">
            WEIRD COINS: {weirdCoins} <span className="weird-icon">⟠</span>
          </div>
        </div>
      </div>
    </>
  );
}

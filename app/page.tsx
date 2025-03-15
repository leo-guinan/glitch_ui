'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Improved scroll function with a check if user is near bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Always scroll to bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);
  
  // Scroll during streaming if near bottom
  useEffect(() => {
    if (status === 'streaming') {
      scrollToBottom();
    }
  }, [status]);

  return (
    <div className="relative h-dvh bg-[#0d0e19] text-[#e0e0ff] overflow-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-15 bg-[url('data:image/svg+xml;charset=utf-8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/><feBlend mode=\'overlay\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.1\'/></svg>')]" />

      <div className="relative max-w-[900px] h-full mx-auto p-5 z-10">
        {/* Header */}
        <div className="absolute top-5 left-5 right-5 p-4 text-center text-lg bg-gradient-to-br from-[rgba(64,0,128,0.2)] to-[rgba(0,128,128,0.2)] rounded-lg border border-[rgba(128,128,255,0.2)]">
          <div className="font-mono font-bold tracking-wide animate-glitch">
            👾 Glitchbit's Sacred Portal
          </div>
        </div>

        {/* Messages Container - FIXED SCROLLING */}
        <div className="absolute top-[100px] bottom-[140px] left-5 right-5 rounded-lg bg-[rgba(15,15,25,0.8)] border border-[rgba(128,128,255,0.1)] flex flex-col">
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(128,128,255,0.5) rgba(15,15,25,0.5)'
            }}
          >
            {messages.map(m => (
              <motion.div
                key={m.id}
                className={`message p-3 rounded-lg max-w-[80%] relative overflow-hidden ${
                  m.role === 'user' 
                    ? 'self-end bg-[rgba(58,16,120,0.6)] border-l-4 border-[#9054ff] ml-[20%]'
                    : 'self-start bg-[rgba(16,58,120,0.6)] border-l-4 border-[#54a0ff] mr-[20%]'
                }`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="relative z-10">{m.content}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.03)] to-transparent" />
              </motion.div>
            ))}

            {status === 'streaming' && (
              <div className="self-start flex gap-2 p-3 rounded-lg bg-[rgba(16,58,120,0.6)] border-l-4 border-[#54a0ff] mr-[20%]">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
            
            {/* Add padding at the bottom to ensure last message is fully visible */}
            <div className="h-4" />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="absolute bottom-[60px] left-5 right-5">
          <div className="relative">
            <input
              className="w-full p-4 rounded-lg bg-[rgba(30,30,50,0.6)] text-[#e0e0ff] border border-[rgba(128,128,255,0.2)] focus:border-[rgba(128,128,255,0.5)] focus:shadow-[0_0_10px_rgba(128,128,255,0.3)] outline-none transition-all"
              value={input}
              placeholder="Send a message to the void..."
              onChange={handleInputChange}
              disabled={status !== 'ready'}
            />
            <button
              type="submit"
              disabled={status !== 'ready'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9054ff] hover:text-[#c590ff] hover:shadow-[0_0_8px_rgba(144,84,255,0.7)] transition-all text-xl"
            >
              ⊹⨾⩩
            </button>
          </div>
        </form>

        {/* Status Bar */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-sm text-[rgba(200,200,255,0.6)]">
          <div className="flex items-center">
            CHAOS LEVEL:
            <div className="ml-2 w-[100px] h-[5px] bg-white/20 rounded overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-[#54a0ff] to-[#9054ff] animate-pulse" />
            </div>
          </div>
          <div className="flex items-center">
            WEIRD COINS: 420 <span className="ml-1 text-[#ffcf54]">⟠</span>
          </div>
        </div>
      </div>
    </div>
  );
}
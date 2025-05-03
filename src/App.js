import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: prompt,
          stream: false
        })
      });

      const data = await response.json();
      const botMessage = { role: 'bot', text: data.response || '⚠️ No reply received from model.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { role: 'bot', text: '❌ Error: ' + err.message };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>💬 LLaMA 3.2 Chat (Offline)</h1>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          rows={3}
          value={prompt}
          placeholder="Type your message..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default App;

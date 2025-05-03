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

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: prompt,
          stream: true
        }),
        signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullResponse = '';
      let botMessage = { role: 'bot', text: '' };
      setMessages((prev) => [...prev, botMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.response) {
              fullResponse += json.response;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'bot', text: fullResponse };
                return updated;
              });
            }
          } catch (err) {
            console.error('❌ JSON parse error:', err);
          }
        }
      }

    } catch (err) {
      const errorMsg = { role: 'bot', text: '❌ Error: ' + err.message };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setMessages([]);
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
        <div className="button-row">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? '...' : 'Send'}
          </button>
          <button onClick={handleClear} className="clear-btn">
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

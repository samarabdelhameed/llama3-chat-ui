# 🧠 LLaMA 3.2 Chat UI (Offline)

A simple React-based chat interface powered by [Ollama](https://ollama.com/) running LLaMA 3.2 locally. This project allows you to interact with a large language model completely offline — no internet or OpenAI API required.

---

## 🚀 Features

- 🔒 100% offline — no external API calls
- 💬 Real-time streaming responses (ChatGPT-like typing)
- ✅ Supports prompt history and user/bot chat bubbles
- 🧹 Clear Chat button to reset the conversation
- 🧠 Powered by `llama3` model via Ollama

---

## 🧰 Requirements

- macOS (or Linux)
- [Ollama installed](https://ollama.com/download)
- Node.js + npm installed

---

## 🛠️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/llama3-chat-ui.git
cd llama3-chat-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Make sure Ollama is running

```bash
ollama serve
```

And make sure you've pulled the LLaMA 3 model:

```bash
ollama run llama3
```

### 4. Start the React app

```bash
npm start
```

App will be running on `http://localhost:3000`

---

## 📷 Preview

![Screenshot](screenshot.png)

---

## 📦 Technologies

- React.js
- Ollama (LLaMA 3.2)
- Fetch Streaming
- CSS (no external frameworks)

---

## 📝 License

MIT License — feel free to fork and build on top of this!

---

## 🙌 Credits

Built with ❤️ by [Your Name](https://github.com/your-username)

```

```

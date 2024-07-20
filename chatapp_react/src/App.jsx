import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';

function App() {
  const [username, setUsername] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('c524b7fadebfcedaa4aa', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      allMessages.push(data);
      setMessages([...allMessages]);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        message,
      }),
    }).then(() => {
      setMessage(''); // Clear the input field after sending the message
    });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={onSubmit}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <div>
              <strong>{msg.username}</strong>
            </div>
            <div>
              <strong>{msg.message}</strong>
            </div>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default App;


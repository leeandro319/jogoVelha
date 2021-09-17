import React, { useState } from 'react';

export const Chat = ({ sendMessage, messages }) => {
  const [messagesToSend, setMessagesToSend] = useState('');

  return (
    <div style={{ flex: 1, }}>
      <div style={{ whiteSpace: 'pre-wrap' }}>{messages}</div>
      <input type="text" value={messagesToSend} onChange={e => setMessagesToSend(e.target.value)} />
      <button onClick={() => sendMessage(messagesToSend)}>Send</button>
    </div>
  );
}
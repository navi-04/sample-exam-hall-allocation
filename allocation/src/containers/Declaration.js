import React from "react";

export default function Declaration() {

  const sendMessage = () => {
    fetch('http://localhost:5000/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numbers: ["+918122118540"],
        message: 'You are allocated to the hall "hall_rk111"',
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  return (
    <div>
      <h1>Send messages!!!</h1>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

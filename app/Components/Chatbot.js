import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! Ask me about gadgets.", sender: "bot" }]);
  const [input, setInput] = useState("");

 
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleSendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { text: input, sender: "user" }];
  setMessages(newMessages);

  let attempts = 3;
  let delayTime = 1000;

  while (attempts > 0) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
      break; // Exit loop if request is successful
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);

      if (error.response && error.response.status === 429) {
        attempts -= 1;
        await delay(delayTime);
        delayTime *= 2; // Increase wait time exponentially
      } else {
        setMessages([...newMessages, { text: "Sorry, something went wrong.", sender: "bot" }]);
        break;
      }
    }
  }

  setInput("");
};

  
  

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about a gadget..." />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

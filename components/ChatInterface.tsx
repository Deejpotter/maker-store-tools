'use client';
// Import necessary modules from React and custom CSS
import React, { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import '@/styles/ChatInterface.scss';  // Import custom CSS
import ChatMessage from './ChatMessage';  // Import ChatMessage component
import ConversationsList from './ConversationsList';  // Import the new ConversationsList component

// The chat interface component receives setShowConversations and showConversations as props
export type ChatInterfaceProps = {
  setShowConversations: Dispatch<SetStateAction<boolean>>;
  showConversations: boolean;
};

// Define the ChatInterface component as a functional component
const ChatInterface: React.FC<ChatInterfaceProps> = ({ setShowConversations, showConversations }) => {
  // State to hold all chat messages
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);
  // Reference for auto-scrolling
  const messagesEndRef = useRef(null);
  // Auto-scroll when a new message is added
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });}, [messages]);

  // Function to handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent default form submission behavior
    const inputElement = event.currentTarget.elements.namedItem('user-input') as HTMLInputElement;  // Get the user input element
    const userInput = inputElement.value;  // Get the value of the user input
    inputElement.value = '';  // Clear the user input
    // Add the user's message to the messages state. Use the spread operator to preserve the previous messages then add the new message with the user input and 'user' type.
    setMessages(prevMessages => [...prevMessages, { type: 'user', content: `You: ${userInput}` }]);
    
    // Fetch the bot's response
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';  // Get API URL from environment variable
    try {
      const response = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the bot's response to the messages state
        setMessages(prevMessages => [...prevMessages, { type: 'bot', content: `Bot: ${data.bot_response}` }]);
      }
    } catch (error) {
      console.error('Failed to fetch bot response', error);
    }
  };

  return (
    <div className="container d-flex flex-column" style={{ height: 'calc(100vh - 60px)' }}>  
      <div className="row flex-grow-1">
        
        {/* Sidebar */}
        <div className={`col-md-3 border-right p-3 collapse ${showConversations ? 'show' : 'd-md-block'}`} id="conversation-list">  
          <ConversationsList />
        </div>
        
        {/* Chat area */}
        <div className="col-md p-3 d-flex flex-column">  
          
          {/* Chat container */}
          <div className="border rounded p-3 flex-grow-1 d-flex flex-column" id="chat-container">
            
            {/* Message container */}
            <div className="flex-grow-1 overflow-auto" id="message-container">  
              {messages.map((message, index) => (
                <ChatMessage key={index} type={message.type} message={message.content} />
              ))}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef}></div>  
            </div>
            
            {/* Chat form */}
            <form className="form-inline bg-white p-2" id="chat-form" onSubmit={handleFormSubmit}> 
              <input type="text" className="form-control mr-2 flex-grow-1" name="user-input" placeholder="Type your message..." />
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};

// Set default export for this component to make it easier to import into other files
export default ChatInterface;

'use client';
import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '@/lib/geminiService';
import { type ChatMessage } from '../types';
import { MessageCircle, X } from 'lucide-react';

type MessageBubbleProps = {
  msg: ChatMessage;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  const isUser = msg.role === 'user';
  const isError = msg.role === 'error';
  
  const bubbleClasses = isUser 
    ? 'bg-blue-600 text-white self-end'
    : isError
    ? 'bg-red-100 text-red-800 self-start'
    : 'bg-gray-200 text-gray-800 self-start';

  return (
    <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl mb-2 whitespace-pre-wrap ${bubbleClasses}`}>
      {msg.text}
    </div>
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if(isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);
  
  useEffect(() => {
    if (!isOpen) return;
    setMessages([
        { role: 'model', text: 'Hello! I am the FeedlyBot assistant. How can I help you today?' }
    ]);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    const responseText = await askGemini(userInput);

    const newModelMessage: ChatMessage = {
      role: responseText.startsWith('Sorry') ? 'error' : 'model',
      text: responseText,
    };
    setMessages((prev) => [...prev, newModelMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-110 z-50"
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}

      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 origin-bottom-right transition-all duration-300 ease-in-out transform animate-fade-in-up">
          <header className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">FeedlyBot Assistant</h2>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <MessageBubble key={index} msg={msg} />
              ))}
              {isLoading && (
                <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="ml-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading || !userInput.trim()}
                aria-label="Send Message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
          <style>{`
            @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Chatbot;
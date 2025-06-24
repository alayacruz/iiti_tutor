import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { sendMessage, downloadPdf } from './sendMessage.tsx'; // Adjust path as needed

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatProps {
  selectedFeature: string | null;
}

const Chat: React.FC<ChatProps> = ({ selectedFeature }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Welcome to NEXUS! I'm your AI tutor for the IITI community...",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedFeature) {
      const prompts: Record<string, string> = {
        doubt: "I'm ready to help with your course doubts...",
        schedule: "Let's create a personalized study schedule...",
        solve: "I can help you solve question papers...",
        generate: "I'll generate custom question papers...",
        upload: "Upload your study materials or textbook pages...",
        tutor: "I'm your personal AI tutor!"
      };
      const introPrompt = prompts[selectedFeature] || '';
      handleSendMessage(introPrompt);
    }
  }, [selectedFeature]);

  const handleSendMessage = async (message: string, file?: File | null) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const res = await sendMessage(message, file || undefined);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: res.text || "Sorry, I couldn't understand that.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);

      if (res.file) {
        downloadPdf(res.file);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        message: 'Oops! Something went wrong. Please try again.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white/70 dark:bg-black transition-colors duration-100">
      <div className="flex-1 overflow-y-auto p-6 pt-[81px] space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className="max-w-4xl mx-auto">
            <Message message={msg.message} isBot={msg.isBot} timestamp={msg.timestamp} />
          </div>
        ))}
        {isLoading && <div className="max-w-4xl mx-auto"><TypingIndicator /></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full border-t bg-white/40 dark:bg-black/80 border-gray-300 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;









  

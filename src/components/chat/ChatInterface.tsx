import { useRef, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useThapluBot } from '@/hooks/useThapluBot';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from './EmptyState';

export const ChatInterface = () => {
  const { messages, isLoading, error, isConnected, sendMessage, clearChat } = useThapluBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandedSources, setExpandedSources] = useState<string | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const toggleSources = (messageId: string) => {
    setExpandedSources(expandedSources === messageId ? null : messageId);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden p-2 sm:p-4 md:p-6">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative flex flex-col flex-1 max-w-5xl mx-auto w-full overflow-hidden">
        {/* Header */}
        <ChatHeader
          onClearChat={clearChat}
          isConnected={isConnected}
          messageCount={messages.length}
        />

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto glass rounded-2xl p-4 mb-4">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    showSources={expandedSources === message.id}
                    onToggleSources={() => toggleSources(message.id)}
                  />
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex-shrink-0">
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            disabled={!isConnected}
          />

          {/* Error message */}
          {error && !isConnected && (
            <p className="text-xs text-destructive text-center mt-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

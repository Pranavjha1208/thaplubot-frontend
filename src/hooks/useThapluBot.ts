import { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = 'https://thaplubot-backend.onrender.com';

export interface Source {
  title: string;
  snippet: string;
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
  sources?: Source[];
  verificationStatus?: string;
}

interface ChatResponse {
  success: boolean;
  response: string;
  sources: Source[];
  verification_status: string;
  context_length: number;
  session_id: string;
  timestamp: string;
  error?: string;
}

export const useThapluBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
          setIsConnected(true);
          setError(null);
        } else {
          setIsConnected(false);
          setError('API not responding');
        }
      } catch {
        setIsConnected(false);
        setError('Cannot connect to ThapluBot API. Make sure it\'s running on localhost:5001');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          session_id: sessionId,
        }),
      });

      const data: ChatResponse = await response.json();

      if (data.success) {
        setSessionId(data.session_id);

        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: data.response,
          timestamp: data.timestamp,
          sources: data.sources,
          verificationStatus: data.verification_status,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        setError(data.error || 'Failed to get response');

        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: data.response || 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      setError('Failed to connect to ThapluBot API');

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'bot',
        content: 'Oops! I couldn\'t connect to my backend. Make sure the API is running on localhost:5001! 🔌',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const clearChat = useCallback(async () => {
    if (sessionId) {
      try {
        await fetch(`${API_BASE_URL}/api/context/${sessionId}`, {
          method: 'DELETE',
        });
      } catch {
        // Ignore errors when clearing
      }
    }

    setMessages([]);
    setSessionId(null);
    setError(null);
  }, [sessionId]);

  return {
    messages,
    isLoading,
    sessionId,
    error,
    isConnected,
    sendMessage,
    clearChat,
  };
};

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, isLoading, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      // Secret easter egg: Check if message is "pj note"
      if (message.trim().toLowerCase() === 'pj note') {
        navigate('/secret-note');
        setMessage('');
        return;
      }

      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="glass-strong rounded-2xl p-2 md:p-3 glow-purple-sm">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask ThapluBot anything..."
              disabled={isLoading || disabled}
              rows={1}
              className="w-full bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base py-2 px-3 max-h-[150px]"
            />
          </div>

          <motion.button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-xl gradient-purple flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed glow-purple-sm touch-manipulation"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
            >
              {isLoading ? (
                <Sparkles size={20} className="text-white" />
              ) : (
                <Send size={20} className="text-white" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Character hint - hidden on mobile */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: message.length > 0 ? 1 : 0 }}
        className="absolute -bottom-5 right-2 text-xs text-muted-foreground hidden md:block"
      >
        Press Enter to send, Shift+Enter for new line
      </motion.p>
    </motion.form>
  );
};

import { motion } from 'framer-motion';
import { Trash2, Wifi, WifiOff, Sparkles } from 'lucide-react';
import { BotAvatar } from './BotAvatar';

interface ChatHeaderProps {
  onClearChat: () => void;
  isConnected: boolean;
  messageCount: number;
}

export const ChatHeader = ({ onClearChat, isConnected, messageCount }: ChatHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-3 md:p-4 mb-4 glow-purple"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        {/* Logo and title */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BotAvatar size="lg" imageUrl="/thaplu-avatar.gif" />
          </motion.div>

          <div>
            <motion.h1
              className="text-xl md:text-2xl font-bold gradient-text flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              ThapluBot
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xs md:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AI-powered with multi-source verification ✨
            </motion.p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          {/* Connection status */}
          <motion.div
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-full glass text-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isConnected ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Wifi size={12} className="text-green-400" />
                </motion.div>
                <span className="text-green-400 hidden sm:inline">Connected</span>
                <span className="text-green-400 sm:hidden">On</span>
              </>
            ) : (
              <>
                <WifiOff size={12} className="text-red-400" />
                <span className="text-red-400 hidden sm:inline">Disconnected</span>
                <span className="text-red-400 sm:hidden">Off</span>
              </>
            )}
          </motion.div>

          {/* Message count */}
          {messageCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 md:px-3 py-1.5 rounded-full glass text-xs text-muted-foreground"
            >
              <span className="hidden sm:inline">{messageCount} messages</span>
              <span className="sm:hidden">{messageCount}</span>
            </motion.div>
          )}

          {/* Clear chat button */}
          {messageCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClearChat}
              className="p-2 md:p-2.5 rounded-xl glass hover:bg-destructive/20 transition-colors group touch-manipulation"
              title="Clear chat"
            >
              <Trash2 size={16} className="text-muted-foreground group-hover:text-destructive transition-colors" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

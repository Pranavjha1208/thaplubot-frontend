import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCircle, Zap } from 'lucide-react';
import { BotAvatar } from './BotAvatar';

const features = [
  { icon: Search, title: 'Web Search', description: 'Searches multiple sources' },
  { icon: CheckCircle, title: 'Verified', description: 'Cross-references facts' },
  { icon: MessageSquare, title: 'Context', description: 'Remembers conversation' },
];

const suggestions = [
  "Oye kitkat dilade yaar 🍫",
  "Chal sushi khane chalte hai 🍣",
  "Bhai mai batari hun fr fr 💀",
  "No cap, explain this to me bestie ✨",
];

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const EmptyState = ({ onSuggestionClick }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full py-8 px-4"
    >
      {/* Animated Bot */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <BotAvatar size="lg" imageUrl="/thaplu-avatar.gif" />
      </motion.div>

      {/* Welcome text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl font-bold gradient-text mb-2 text-center"
      >
        Hey there! I'm ThapluBot 👋
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm md:text-base text-muted-foreground text-center mb-8 max-w-md px-4"
      >
        Your AI assistant with real-time web search and fact verification. Ask me anything!
      </motion.p>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 w-full max-w-2xl px-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="glass px-3 md:px-4 py-2 rounded-xl flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left"
          >
            <feature.icon size={16} className="text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-lg px-4"
      >
        <p className="text-xs text-muted-foreground text-center mb-3">Try asking:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionClick(suggestion)}
              className="glass px-4 py-3 rounded-xl text-sm text-left hover:border-primary/50 transition-colors touch-manipulation"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

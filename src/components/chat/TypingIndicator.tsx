import { motion } from 'framer-motion';
import { BotAvatar } from './BotAvatar';

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex items-start gap-3 mb-4"
    >
      <BotAvatar isSpeaking={true} size="sm" imageUrl="/thaplu-avatar.gif" />

      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground mr-2">Thinking</span>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

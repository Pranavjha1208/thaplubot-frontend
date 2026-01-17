import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface BotAvatarProps {
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
};

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 40,
};

export const BotAvatar = ({ isSpeaking = false, size = 'md', imageUrl }: BotAvatarProps) => {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <motion.div
        className={`absolute inset-0 rounded-full gradient-purple ${sizeClasses[size]}`}
        animate={isSpeaking ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {
          scale: 1,
          opacity: 0.3,
        }}
        transition={{
          duration: 0.6,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{ filter: 'blur(8px)' }}
      />
      
      {/* Avatar container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-full glass-strong border-2 border-primary/50 flex items-center justify-center overflow-hidden`}
        animate={isSpeaking ? {
          scale: [1, 1.05, 1],
        } : {
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt="ThapluBot"
            className="w-full h-full object-cover"
            animate={isSpeaking ? {
              scale: [1, 1.08, 1],
            } : {}}
            transition={{
              duration: 0.3,
              repeat: isSpeaking ? Infinity : 0,
            }}
          />
        ) : (
          <motion.div
            animate={isSpeaking ? {
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isSpeaking ? Infinity : 0,
            }}
          >
            <Bot size={iconSizes[size]} className="text-primary" />
          </motion.div>
        )}
      </motion.div>

      {/* Speaking indicator dots */}
      {isSpeaking && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

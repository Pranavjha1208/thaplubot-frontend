import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { BotAvatar } from './BotAvatar';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Message, Source } from '@/hooks/useThapluBot';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  showSources?: boolean;
  onToggleSources?: () => void;
}

export const ChatMessage = ({ message, showSources, onToggleSources }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.role === 'bot';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className={cn(
        "flex items-start gap-2 md:gap-3 mb-4",
        !isBot && "flex-row-reverse"
      )}
    >
      {isBot && <BotAvatar size="sm" imageUrl="/thaplu-avatar.gif" />}

      <div className="flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[75%] gap-1">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            "rounded-2xl px-4 py-3 relative group",
            isBot
              ? "glass rounded-tl-sm"
              : "gradient-purple rounded-tr-sm text-primary-foreground"
          )}
        >
          {/* Message content */}
          {isBot ? (
            <MarkdownRenderer content={message.content} />
          ) : (
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {/* Copy button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className={cn(
              "absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
              isBot ? "bg-secondary/50 hover:bg-secondary" : "bg-white/20 hover:bg-white/30"
            )}
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} className={isBot ? "text-muted-foreground" : "text-white"} />
            )}
          </motion.button>
        </motion.div>

        {/* Metadata row */}
        <div className={cn(
          "flex items-center gap-2 px-2 text-xs text-muted-foreground",
          !isBot && "flex-row-reverse"
        )}>
          <span>{formatTimestamp(message.timestamp)}</span>

          {isBot && message.verificationStatus && (
            <div className="flex items-center gap-1">
              {message.verificationStatus === 'cross-verified' ? (
                <>
                  <CheckCircle2 size={12} className="text-green-400" />
                  <span className="text-green-400">Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle size={12} className="text-yellow-400" />
                  <span className="text-yellow-400">Single source</span>
                </>
              )}
            </div>
          )}

          {isBot && message.sources && message.sources.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSources}
              className="flex items-center gap-1 text-primary hover:text-accent transition-colors"
            >
              <ExternalLink size={12} />
              <span>{message.sources.length} sources</span>
            </motion.button>
          )}
        </div>

        {/* Sources panel */}
        {showSources && message.sources && message.sources.length > 0 && (
          <SourcesPanel sources={message.sources} />
        )}
      </div>
    </motion.div>
  );
};

const SourcesPanel = ({ sources }: { sources: Source[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="glass rounded-xl p-3 mt-2"
    >
      <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
        <ExternalLink size={12} />
        Sources
      </h4>
      <div className="space-y-2">
        {sources.map((source, index) => (
          <motion.a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="block p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <p className="text-xs font-medium text-foreground line-clamp-1">
              {source.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {source.snippet}
            </p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

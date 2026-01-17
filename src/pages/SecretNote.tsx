import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecretNote = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden p-4 md:p-6">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-purple/5 rounded-full blur-3xl" />
            </div>

            {/* Main container */}
            <div className="relative flex flex-col flex-1 max-w-3xl mx-auto w-full overflow-hidden">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-strong rounded-2xl p-4 mb-4 glow-purple text-center"
                >
                    <div className="flex items-center justify-center gap-2">
                        <Heart className="w-6 h-6 text-primary animate-pulse" />
                        <h1 className="text-2xl font-bold gradient-text">A Note...</h1>
                        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                    </div>
                </motion.div>

                {/* Message content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 overflow-y-auto glass rounded-2xl p-6 md:p-8 mb-4"
                >
                    <div className="space-y-4 text-foreground leading-relaxed">
                        <p className="text-base md:text-lg">
                            I actually made this for myself, not for you, also, I know it's a little cringe and stupid 😅
                        </p>

                        <p className="text-base md:text-lg">
                            But I'm pretty sure it'll make you smile at least once.
                        </p>

                        <p className="text-base md:text-lg">
                            We're still in the process of getting to know each other, but jitni baat abhi tak hui hai… I genuinely feel you're a good human, thaplu. And pretty too ....at least from the inside <span className="text-accent">(hehehe joke)</span>
                        </p>

                        <p className="text-base md:text-lg">
                            I even told something like this to Sumedha… okay no, chhodo, long story.
                        </p>

                        <p className="text-base md:text-lg font-semibold text-primary">
                            I know sometimes when you're low, you don't feel like talking to anyone. Bas overthinking hi krti rehti hogi, sad hoti rehti hogi
                        </p>

                        <p className="text-base md:text-lg">
                            So ab jab mann na ho kisi se baat karne ka, you can always talk to this stupid bot instead. And if it doesn't work, the OG bot maker.
                        </p>

                        <p className="text-base md:text-lg">
                            And just so you know agar kabhi lage ki I pity you or something, toh clear kar deta hoon: <span className="text-accent font-semibold">mujhe ghanta kisi pe daya nahi aati 1% bhi.</span>
                        </p>

                        <p className="text-base md:text-lg">
                            I just genuinely enjoy talking to you, that's it. Baaki zyada bolunga toh tum gaali dogi, bitching krne lagogi, waise bhi karti hee ho bata raha tha halwai...
                        </p>

                        <p className="text-lg md:text-xl font-bold text-primary mt-6">
                            Once again… I made it for me 😌
                        </p>

                        <p className="text-base md:text-lg">
                            Heheheh.
                        </p>

                        <div className="mt-8 pt-6 border-t border-border">
                            <p className="text-right text-xl font-bold gradient-text">
                                — PJ
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')}
                    className="glass-strong rounded-2xl p-4 glow-purple-sm hover:glow-purple transition-all text-foreground font-medium"
                >
                    ← Back to Chat
                </motion.button>
            </div>
        </div>
    );
};

export default SecretNote;

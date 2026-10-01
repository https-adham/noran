import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from './utils';

const photos = Array.from({ length: 17 }, (_, i) => `./assets/photos/photo${i + 1}.jpeg`);

const captions = [
  "Simply beautiful. ❤️",
  "That smile.",
  "How can someone be this beautiful?",
  "My favorite view.",
  "Just Noran being Noran.",
  "Pretty looks good on you.",
  "Still can't get over this smile.",
  "You're beautiful in every version of you.",
  "Some photos deserve to be looked at twice.",
];

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative bg-midnight min-h-screen text-gray-100 font-sans selection:bg-pink-500/30 selection:text-pink-200">
      <AnimatePresence mode="wait">
        {!started ? (
          <Opening key="opening" onStart={() => setStarted(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <MusicPlayer />
            <Hero photo={photos[0]} />
            <AboutNoran />
            <Gallery photos={photos.slice(1, -1)} />
            <LoveLetter />
            <SecretMessage />
            <FinalScene photo={photos[photos.length - 1]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Opening({ onStart }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6000);
    const t3 = setTimeout(() => setStep(3), 9000);
    const t4 = setTimeout(() => setStep(4), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Subtle particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-midnight to-midnight opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-40">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.h1 key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }} className="font-serif text-2xl tracking-widest text-white/80">
              For Noran...
            </motion.h1>
          )}
          {step === 1 && (
            <motion.h1 key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 2 }} className="font-serif text-4xl font-medium text-white text-glow">
              Happy Birthday ❤️
            </motion.h1>
          )}
          {step === 2 && (
            <motion.h1 key="3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 2 }} className="font-sans font-light tracking-[0.3em] text-xl text-white/70">
              4 / 10
            </motion.h1>
          )}
          {step >= 3 && (
            <motion.h1 key="4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} className="font-handwriting text-5xl text-pink-300 text-glow-pink">
              بحبك يا نونتي ❤️
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step >= 4 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            onClick={onStart}
            className="mt-16 px-8 py-3 rounded-full border border-white/20 glass hover:bg-white/10 transition-colors duration-500 font-sans tracking-widest text-sm uppercase text-white/90"
          >
            Open Your Surprise ✨
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/music/song.mp3`} loop />
      <button 
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full glass hover:bg-white/10 transition-colors"
      >
        {isPlaying ? <Pause size={20} className="text-white/80" /> : <Play size={20} className="text-white/80 ml-1" />}
      </button>
    </div>
  );
}

function Hero({ photo }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url(${photo})` }}
        ></div>
        <div className="absolute inset-0 bg-midnight/40 bg-gradient-to-t from-midnight via-midnight/20 to-transparent"></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center flex flex-col items-center justify-center space-y-6"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl font-medium text-white text-glow"
        >
          Happy Birthday, Noran ❤️
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="font-sans font-light tracking-[0.2em] text-lg text-white/80"
        >
          Today is all about you.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="font-sans font-light tracking-[0.4em] text-sm text-white/50"
        >
          4 / 10
        </motion.p>
      </motion.div>
    </section>
  );
}

function AboutNoran() {
  return (
    <section className="py-32 px-6 relative z-20 bg-midnight">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-4xl text-pink-100"
        >
          A Little Celebration of You ❤️
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6 font-sans text-lg font-light text-white/70 leading-relaxed"
        >
          <p>Some people simply have a way of making the world feel a little brighter just by being themselves.</p>
          <p>Today is your day, Noran.</p>
          <p>A day to celebrate your smile, your presence, and the beautiful person you are.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery({ photos }) {
  return (
    <section className="py-24 px-4 bg-midnight relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, i) => (
            <CinematicPhoto key={i} photo={photo} caption={captions[i % captions.length]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CinematicPhoto({ photo, caption, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: (index % 3) * 0.2 }}
      className="relative group break-inside-avoid overflow-hidden rounded-md"
    >
      <div className="overflow-hidden bg-white/5">
        <img 
          src={photo} 
          alt="Noran" 
          className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end">
        <p className="p-6 font-serif text-white/90 text-lg">{caption}</p>
      </div>
    </motion.div>
  );
}

function LoveLetter() {
  return (
    <section className="py-32 px-6 relative z-20 bg-midnight flex items-center justify-center">
      <div className="max-w-xl mx-auto glass p-10 md:p-16 rounded-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="space-y-8"
        >
          <h2 className="font-serif text-3xl text-pink-100 text-center mb-12">To My Noran ❤️</h2>
          
          <div className="font-handwriting text-2xl md:text-3xl text-white/80 leading-relaxed space-y-6">
            <p>You are so incredibly beautiful and special, today and every single day.</p>
            <p>Your birthday is a day I want to celebrate because it's the day the world got you. I'm so grateful to have you in my life.</p>
            <p>I hope this year brings you as much happiness as you bring to me.</p>
            <p className="pt-8 text-center text-pink-300">بحبك يا نونتي ❤️</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SecretMessage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="py-32 px-6 relative z-20 bg-midnight min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-10">
        <h2 className="font-serif text-2xl md:text-3xl text-white/60">نونتي... استني ❤️</h2>
        
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setRevealed(true)}
              className="px-8 py-3 rounded-full border border-pink-500/30 text-pink-200 hover:bg-pink-500/10 transition-colors font-sans tracking-wide"
            >
              في حاجة صغيرة ليكي...
            </motion.button>
          ) : (
            <motion.div
              key="msg"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="space-y-6"
            >
              <h3 className="font-handwriting text-5xl text-pink-300 text-glow-pink">بحبك يا نونتي ❤️</h3>
              <p className="font-sans text-lg text-white/70">وكل سنة وإنتي أجمل حاجة في يوم 4/10.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FinalScene({ photo }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center z-20">
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${photo})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2 }}
          className="font-serif text-4xl md:text-5xl text-white text-glow"
        >
          Happy Birthday, Noran ❤️
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="font-sans font-light tracking-[0.4em] text-lg text-white/60"
        >
          4 / 10
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, delay: 3 }}
          className="font-handwriting text-4xl text-pink-300 pt-10"
        >
          بحبك يا نونتي.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 5 }}
          className="text-2xl"
        >
          ❤️
        </motion.div>
      </div>
    </section>
  );
}

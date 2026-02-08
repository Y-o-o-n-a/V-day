import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Messages that cycle when clicking "No"
const noMessages = [
  'No',
  'Are you sure?',
  'Double confirm??',
  'Are you super duper sure?',
  'my babyyyy honey pumpkin pleaseeee',
  'Just think about it!',
  'If you say no, Ill be super duper sad...',
  'Ill be very sad...',
  'Ill be very very very sad...',
  'Ok fine, I will stop asking...',
  'Just kidding, PLEASE SAY YES',
  'Pleaseeeee',
  'Pretty please my honey pumpkin?',
  "You're breaking my heart :(",
  'Last chance...',
  'PLEASE BABY',
]

function App() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const handleNoClick = () => {
    setMessageIndex((prev) => (prev + 1) % noMessages.length)
    setYesSize((prev) => Math.min(prev * 1.3, 25))
  }

  const handleYesClick = () => {
    setShowSuccess(true)
    setShowHearts(true)
  }

  const handleReset = () => {
    setMessageIndex(0)
    setYesSize(1)
    setShowSuccess(false)
    setShowHearts(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <AnimatePresence>
        {showHearts && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '100vh', 
                  x: `${Math.random() * 100}%`, 
                  opacity: 0,
                  scale: 0.5 
                }}
                animate={{ 
                  y: '-10vh', 
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
                className="absolute text-4xl pointer-events-none"
                style={{ left: `${Math.random() * 90}%` }}
              >
                {['💕', '💖', '💗', '💓', '💝', '❤️', '🩷'][i % 7]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full text-center relative z-10 border border-pink-200"
      >
        {!showSuccess ? (
          <>
            {/* Cute Bear Image */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <img
                src="https://media.tenor.com/YeALWQcVFpEAAAAi/bubu-dudu-rose-dudu-propose.gif"
                alt="Cute bear with flowers"
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto object-contain"
              />
            </motion.div>

            {/* Question */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-rose-500 mb-8"
            >
              Will you be my Valentine?
            </motion.h1>

            {/* Buttons Container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Yes Button - Grows with each No click */}
              <motion.button
                onClick={handleYesClick}
                animate={{ 
                  scale: yesSize,
                  fontSize: `${16 * yesSize}px`
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[80px]"
                style={{ 
                  minHeight: `${48 * yesSize}px`,
                  padding: `${12 * yesSize}px ${32 * yesSize}px`
                }}
              >
                Yes
              </motion.button>

              {/* No Button - Cycles through messages */}
              <motion.button
                onClick={handleNoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl shadow-md transition-all duration-300 min-w-[100px]"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={messageIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {noMessages[messageIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Subtle hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-gray-400 mt-6"
            >
              Pssst... try clicking "No" 😉
            </motion.p>
          </>
        ) : (
          /* Success Page */
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="py-4"
          >
            {/* Success Title */}
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-rose-500 mb-6"
            >
              Hehehe Thank you my lovee!!!! 💕
            </motion.h1>

            {/* Hugging Bears GIF */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <img
                src="https://media1.tenor.com/m/pN7xf12qQcwAAAAC/cuddle-cute.gif"
                alt="Bears hugging"
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto object-contain"
              />
            </motion.div>

            {/* Sweet Message */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg mb-6"
            >
              You made me the happiest BOIBOI IN THE WORLD! 
              <br />
              I love you so much MY PRECIOUS BABYYY! 💖
            </motion.p>

            {/* Reset Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Ask Again 💝
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 text-4xl opacity-30 animate-pulse">💕</div>
      <div className="absolute top-4 right-4 text-4xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}>💖</div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>💗</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}>💝</div>
    </div>
  )
}

export default App

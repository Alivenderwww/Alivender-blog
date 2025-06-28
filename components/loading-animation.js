import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/loading-animation.module.css';

export default function LoadingAnimation({ children }) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 模拟页面加载时间
    const timer = setTimeout(() => {
      setLoading(false);
      // 稍后显示内容，确保动画流畅
      setTimeout(() => setShowContent(true), 500);
    }, 500); // 2秒后开始退出动画

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 统一的蓝色背景 - 从全屏收缩到页眉，同时包含加载内容 */}
      <motion.div
        className={styles.unifiedBackground}
        initial={{ height: '100vh', y: 0 }}
        animate={{ 
          height: loading ? '100vh' : '200px',
          y: loading ? 0 : 0
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          delay: loading ? 0 : 0.3
        }}
      >
        {/* 加载内容 - 只在加载时显示 */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className={styles.loadingContent}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* 加载动效 - 旋转圆环 */}
              <motion.div
                className={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className={styles.spinnerRing}></div>
              </motion.div>
              <motion.p
                className={styles.loadingText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.1 }}
              >
                正在加载博客...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 页面内容 - 逐步显示 */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import LoadingAnimation from './loading-animation';
import { motion } from 'framer-motion';

const name = 'Alivender';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <>
      {/* 地铁站显示屏风格页眉 - 三分区布局 */}
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      >
        {/* 左侧区域 - 铁路名称和开发者信息 */}
        <motion.div 
          className={styles.leftSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.decorLine0}></div>
          <div className={styles.railwayName0}>Alivender</div>
          <div className={styles.railwayName1}>Developer Line</div>
          <div className={styles.decorLine1}></div>
          <div className={styles.developerInfo}>
            <div>个人技术博客</div>
            <div className={styles.subInfo}>Full-Stack Developer</div>
            <div className={styles.subInfo}>Verilog • Web • Embedded</div>
          </div>
        </motion.div>

        {/* 中间区域 */}
        <div className={styles.centerSection}>
          {/* 中间上部分 - 线路信息 */}
          <motion.div 
            className={styles.centerTop}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.lineInfo}>
              <div className={styles.direction}>当前</div>
              {home ? (
                <h1 className={styles.currentStation}>首页</h1>
              ) : (
                <h2 className={styles.currentStation}>
                  <Link href="/" className={utilStyles.colorInherit}>
                    博客详情
                  </Link>
                </h2>
              )}
              <div className={styles.lineNumber}>01</div>
            </div>
          </motion.div>

          {/* 中间下部分 - 地铁线路图 */}
          <motion.div 
            className={styles.centerBottom}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.lineTrack}>
              {/* 站点1：首页 */}
              <motion.div 
                className={`${styles.station} ${home ? styles.current : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5, duration: 0.4, ease: 'easeOut' }}
              >
                <div className={`${styles.stationName} ${home ? styles.current : ''}`}>首页</div>
                <div className={`${styles.stationDot} ${home ? styles.current : ''}`}>01</div>
              </motion.div>

              {/* 站点2：博客 */}
              <motion.div 
                className={`${styles.station} ${!home ? styles.current : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.6, duration: 0.4, ease: 'easeOut' }}
              >
                <div className={`${styles.stationName} ${!home ? styles.current : ''}`}>博客</div>
                <div className={`${styles.stationDot} ${!home ? styles.current : ''}`}>02</div>
              </motion.div>

              {/* 站点3：项目 */}
              <motion.div 
                className={styles.station}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.7, duration: 0.4, ease: 'easeOut' }}
              >
                <div className={styles.stationName}>项目</div>
                <div className={styles.stationDot}>03</div>
              </motion.div>

              {/* 站点4：关于 */}
              <motion.div 
                className={styles.station}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.8, duration: 0.4, ease: 'easeOut' }}
              >
                <div className={styles.stationName}>关于</div>
                <div className={styles.stationDot}>04</div>
              </motion.div>
              {/* 站点5：联系 */}
              <motion.div 
                className={styles.station}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.9, duration: 0.4, ease: 'easeOut' }}
              >
                <div className={styles.stationName}>联系</div>
                <div className={styles.stationDot}>05</div>
              </motion.div>
              {/* 绿色进度条动画箭头 */}
              <div className={styles.trainProgress}>
                <svg className={styles.trainArrow} viewBox="0 0 100 100">
                  <polyline points="0,0 10,0 17,10 10,20.5 0,20.5 7,10" fill="#6BCBE925"/>
                </svg>
              </div>
              <div className={styles.trainProgress}>
                <svg className={styles.trainArrow} viewBox="0 0 100 100">
                  <polyline points="12,0 22,0 29,10 22,20.5 12,20.5 19,10" fill="#6BCBE925"/>
                </svg>
              </div>
              <div className={styles.trainProgress}>
                <svg className={styles.trainArrow} viewBox="0 0 100 100">
                  <polyline points="24,0 34,0 41,10 34,20.5 24,20.5 31,10" fill="#6BCBE925"/>
                </svg>
              </div>
              </div>
          </motion.div>
        </div>

        {/* 右侧区域 - 时间和头像 */}
        <motion.div 
          className={styles.rightSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div 
            className={styles.timeDisplay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            2025.06.28
          </motion.div>
          
          <motion.div 
            className={styles.avatar}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2.7, duration: 0.6, ease: 'easeOut' }}
          >
            {home ? (
              <Image
                priority
                src="/images/profile.jpg"
                className={styles.avatarImage}
                height={50}
                width={50}
                alt=""
              />
            ) : (
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={styles.avatarImage}
                  height={50}
                  width={50}
                  alt=""
                />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </motion.header>
      
      <LoadingAnimation>
        <div className={styles.container}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="description"
              content="Learn how to build a personal website using Next.js"
            />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle,
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
          <main>{children}</main>
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">← Back to home</Link>
            </div>
          )}
        </div>
      </LoadingAnimation>
    </>
  );
}
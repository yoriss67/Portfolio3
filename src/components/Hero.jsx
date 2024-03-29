import { useState, useEffect } from 'react';

import { useTransform, useAnimation, motion  } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Hero({ isJapanese }) {
  const [refH1, inViewH1] = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  const [refUIUX, inViewUIUX] = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  const [refFront, inViewFront] = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  const [refMssg, inViewMssg] = useInView({
    rootMargin: '-50px',
    triggerOnce: true,
  });

  const isPhone = window.innerWidth <= 768;

  const phoneTransition = {
    duration: 2,
    delay:3,
  };

  const pcTransition = {
    duration: 1.5,
    delay: 3,
  };

  // 🌸🌸🌸
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // 背景色
  function interpolateColor(scrollPosition, startRGB, endRGB, maxScroll) {
    const ratio = Math.min(scrollPosition / maxScroll, 1);
    const r = Math.round(startRGB[0] + ratio * (endRGB[0] - startRGB[0]));
    const g = Math.round(startRGB[1] + ratio * (endRGB[1] - startRGB[1]));
    const b = Math.round(startRGB[2] + ratio * (endRGB[2] - startRGB[2]));
  
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  // 使い方
  const startColor = [244, 243, 239]; // #F4F3EF
  const endColor = [246, 154, 118];   // #F69A76
  const maxScrollValue = 1000; // この値は必要に応じて調整
  
  // コンポーネント内での使用例
  const bgColor = interpolateColor(scrollPosition, startColor, endColor, maxScrollValue);
  

  return (
    <div className="hero">
      <motion.div className="hero-bg-wave" style={{ scale: 1 + scrollPosition * 0.01 }}></motion.div>
      <motion.div
        className="hero-bg"
        style={{ backgroundColor: bgColor }}

          ></motion.div>

      <motion.img
        className="girl-img"
        src="/girl.svg"
        alt="girl image"
        style={{ x: scrollPosition * 0.5, scale: 1 + scrollPosition * 0.0001 }}
      />

      <div className="hero-container">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={inViewH1 ? { y: '0vw', opacity: 1, scale: 1 } : {}}
          transition={{ ease: [0.2, 0, 0.6, 1], duration: 2, delay: 1, bounce: 0.3 }}
          className={`hero-name  ${inViewH1 ? 'true' : 'false'}`}
          ref={refH1}
        >
          Hi, I'm Iori !
        </motion.h1>

        <div className={`hero-title`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inViewUIUX ? { y: '0vw', opacity: 1, scale: 1 } : {}}
            transition={{ ease: [0.2, 0, 0.6, 1], duration: 1, delay: 1.5, bounce: 0.3 }}
            className={`uiux  ${inViewUIUX ? 'true' : 'false'}`}
            ref={refUIUX}
          >
            <img className="uiux-icon" src="/icons/uiux.svg" alt="uiux icon" />
            <h2 className={`uiux-text`}>UI / UX</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inViewFront ? { y: '0vw', opacity: 1, scale: 1 } : {}}
            transition={{ ease: [0.2, 0, 0.6, 1], duration: 1, delay: 2, bounce: 0.3 }}
            className={`frontend  ${inViewFront ? 'true' : 'false'}`}
            ref={refFront}
          >
            <img className="frontend-icon" src="/icons/frontend.svg" alt="frontend icon" />
            <h2 className={`frontend-text `}>Frontend</h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: '5vh' }}
          animate={inViewMssg ? { y: '0vw', opacity: 1, scale: 1 } : {}}
          transition={isPhone ? phoneTransition : pcTransition}
          className={`hero-message ${inViewMssg ? 'true' : 'false'}`}
          ref={refMssg}
        >
          <p className={` toggleBox-en ${isJapanese ? 'display-none' : ''}`}>
            I think about how to cross design and technology every day. My goal is to contribute to the creation of
            services that provide convenience and happiness to people.
          </p>
          <p className={` toggleBox-jp ${isJapanese ? '' : 'display-none'}`}>
            デザインとテクノロジーの掛け合わせを 日々考えています。
            <br />
            人に便利さや幸せを提供するサービス作りに貢献することを目指しています。
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;

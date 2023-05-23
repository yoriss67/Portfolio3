import React, { useEffect } from 'react';
import './Global.css';

function Global({ isJapanese, setLanguage })  {

  useEffect(() => {
    const loader = document.getElementById('loading');
    loader.classList.add('loaded');
  }, []);


  const handleTranslateClick = () => {
    setLanguage(!isJapanese);
  };
  
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const stalker = document.getElementById('stalker');

    const mouseMoveHandler = (event) => {
        const x = event.clientX;
        const y = event.clientY;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        setTimeout(function () {
        stalker.style.left = `${x}px`;
        stalker.style.top = `${y}px`;
      }, 140);
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
    };
}, []);

  return (
    <>
      <div id="cursor"></div>
      <div id="stalker"></div>

      <div id="loading">
        <div id="loading-relative">
          <div className="sun-circle"></div>
          <div className="horizon"></div>

          <div className="sun-border1"></div>
          <div className="sun-border2"></div>
          <div className="sun-border3"></div>
          <div className="sun-border4"></div>
          <div className="sun-border5"></div>
        </div>
      </div>

      <button 
        id="translate" 
        className={`js-turn-to-red ${isJapanese ? 'change-color' : ''}`} 
        onClick={handleTranslateClick}
      >
        <p>EN-JP</p>
      </button>
    </>
  );
}

export default Global;
import  { useEffect, useRef } from 'react';
import './css/Global.css';

function Global({ isJapanese, setLanguage }) {
  const loaderRef = useRef(null);
  const cursorRef = useRef(null);
  const stalkerRef = useRef(null);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    loaderElement.classList.add('loaded');

    const cursorElement = cursorRef.current;
    const stalkerElement = stalkerRef.current;

    const mouseMoveHandler = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cursorElement.style.left = `${x}px`;
      cursorElement.style.top = `${y}px`;

      setTimeout(() => {
        stalkerElement.style.left = `${x}px`;
        stalkerElement.style.top = `${y}px`;
      }, 140);
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  const handleTranslateClick = () => {
    setLanguage(!isJapanese);
  };

  return (
    <>
      <div ref={cursorRef} id="cursor"></div>
      <div ref={stalkerRef} id="stalker"></div>

      <div ref={loaderRef} id="loader">
        <img className="iconn" src="/icons/icon.png" alt="icon" />
      </div>

      <button
        id="translate"
        onClick={handleTranslateClick}
      >
        <p>EN-JP</p>
      </button>
    </>
  );
}

export default Global;

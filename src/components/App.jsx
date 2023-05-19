import { useState } from 'react';
// import reactLogo from '../assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import Spline from '@splinetool/react-spline';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="spline">
      <Spline scene="https://prod.spline.design/zcaoqR2JOYOCmmmd/scene.splinecode" />
    </div>
  );
}

export default App;

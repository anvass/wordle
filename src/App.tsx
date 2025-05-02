import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalContainer from './components/ModalContainer';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

function App() {
  const { width, height } = useWindowSize();
  const [needConfetti, setNeedConfetti] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Grid />
        <Keyboard />
        <ModalContainer />
        <Footer />
        {needConfetti && (
          <Confetti width={width} height={height} recycle={false} />
        )}
      </div>
    </>
  );
}

export default App;

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalContainer from './components/ModalContainer';
import Confetti from './components/Confetti';

function App() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen max-w-[700px] m-auto px-2">
        <Header />
        <Grid />
        <Keyboard />
        <ModalContainer />
        <Footer />
        <Confetti />
      </div>
    </>
  );
}

export default App;

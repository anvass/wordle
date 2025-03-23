import Keyboard from './components/Keyboard/Keyboard';
import Wordgrid from './components/Wordgrid/Wordgrid';

function App() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold uppercase">
        Wordle
      </h1>

      <Wordgrid />

      <Keyboard />
    </>
  );
}

export default App;

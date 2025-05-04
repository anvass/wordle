import { BsQuestionCircleFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { GrPowerReset } from 'react-icons/gr';
import { resetGame, setModalName } from '../redux/appSlice';

function Header() {
  const gameState = useAppSelector((store) => store.appSlice.gameState);
  const dispatch = useAppDispatch();

  const handleHelpClick = () => {
    dispatch(setModalName('help'));
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  return (
    <header>
      <div className="container flex justify-between items-center py-3 md:py-5">
        <div>
          <h1 className="text-center text-3xl md:text-4xl uppercase">Вордл</h1>
        </div>
        <div className="flex justify-end gap-2 items-center">
          {gameState.isFinished && (
            <button
              className="text-gray-500 text-[30px] cursor-pointer hover:text-black"
              onClick={handleResetGame}
            >
              <GrPowerReset />
            </button>
          )}
          <button
            className="text-gray-500 text-[30px] cursor-pointer hover:text-black"
            onClick={handleHelpClick}
          >
            <BsQuestionCircleFill />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

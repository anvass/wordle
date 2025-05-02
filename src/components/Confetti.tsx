import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useAppSelector } from '../redux/store';
import { useEffect, useState } from 'react';

function ConfettiContainer() {
  const isFinishedGame = useAppSelector(
    (store) => store.appSlice.gameState.isFinished
  );
  const modalName = useAppSelector((store) => store.appSlice.modalName);

  const { width, height } = useWindowSize();

  const [needConfetti, setNeedConfetti] = useState<boolean>(false);

  useEffect(() => {
    if (isFinishedGame && modalName === 'success') {
      setNeedConfetti(true);
    } else {
      setNeedConfetti(false);
    }
  }, [isFinishedGame, modalName]);

  return (
    <>
      {needConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </>
  );
}

export default ConfettiContainer;

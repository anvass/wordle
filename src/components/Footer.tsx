import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { useAppDispatch } from '../redux/store';
import { setModalName } from '../redux/appSlice';
import { useEffect, useState } from 'react';

function Footer() {
  const dispatch = useAppDispatch();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onHelpClick = () => {
    dispatch(setModalName('help'));
  };

  return screenWidth > 768 ? (
    <footer className="container flex flex-col justify-end grow w-full">
      <div className="flex flex-col justify-center items-center border-t py-5">
        <div className="mb-5">
          <button
            className="underline cursor-pointer hover:no-underline"
            onClick={onHelpClick}
          >
            Правила
          </button>
        </div>
        <div>
          <p className="flex items-center">
            <AiOutlineCopyrightCircle />
            {`${new Date().getFullYear()} Все права защищены.`}
          </p>
        </div>
      </div>
    </footer>
  ) : (
    ''
  );
}

export default Footer;

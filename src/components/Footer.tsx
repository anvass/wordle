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

  return screenWidth > 481 ? (
    <footer className="flex flex-col justify-end grow">
      <div className="border-t">
        <div className="container flex w-full flex-col justify-center items-center py-5">
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
      </div>
    </footer>
  ) : (
    ''
  );
}

export default Footer;

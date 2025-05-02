import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { useAppDispatch } from '../redux/store';
import { setModalName } from '../redux/appSlice';

function Footer() {
  const dispatch = useAppDispatch();

  const onHelpClick = () => {
    dispatch(setModalName('help'));
  };

  return (
    <footer className="flex flex-col justify-end grow">
      <div className="container flex flex-col justify-center items-center border-t py-5">
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
  );
}

export default Footer;

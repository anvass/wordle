import { AiOutlineCopyrightCircle } from 'react-icons/ai';

function Footer({ onHelpClick }: { onHelpClick: () => void }) {
  return (
    <footer>
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

import { BsQuestionCircleFill } from 'react-icons/bs';

function Header({ onHelpClick }: { onHelpClick: () => void }) {
  return (
    <header>
      <div className="container flex justify-between items-center py-3 md:py-5">
        <div></div>
        <div>
          <h1 className="text-center text-3xl md:text-4xl uppercase">Вордл</h1>
        </div>
        <div className="flex justify-end gap-2 items-center">
          <button
            className="text-gray-500 text-[30px] cursor-pointer hover:text-black"
            onClick={onHelpClick}
          >
            <BsQuestionCircleFill />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

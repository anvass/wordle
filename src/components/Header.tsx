import { BsQuestionCircleFill } from 'react-icons/bs';

function Header() {
  return (
    <header className="flex justify-between items-center mb-5 p-5">
      <div></div>
      <div>
        <h1 className="text-center text-5xl md:text-4xl uppercase">Вордл</h1>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <button className="text-gray-500 text-[30px] cursor-pointer hover:text-black">
          <BsQuestionCircleFill />
        </button>
      </div>
    </header>
  );
}

export default Header;

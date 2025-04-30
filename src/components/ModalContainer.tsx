import Modal from './Modal';
import { FaDeleteLeft } from 'react-icons/fa6';
import { AiOutlineEnter } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';
import { ModalName } from '../types';

function ModalContainer({
  modalName,
  setModalName,
  onReset,
  onClose,
}: {
  modalName: null | string;
  setModalName: Dispatch<SetStateAction<ModalName | null>>;
  onReset: () => void;
  onClose: () => void;
}) {
  if (!modalName) {
    return null;
  }
  if (modalName === 'help') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Помощь'}>
        <div className="text-left flex flex-col gap-4">
          <div>
            <p>
              Вордл - это простая и увлекательная головоломка, в которой нужно
              угадать слово из 5 букв за 6 попыток.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-center">Как играть?</p>
            <ol>
              <li>Введите любое слово из пяти букв</li>
              <li>
                Нажмите
                <span className="inline-block px-1 align-middle">
                  <FaDeleteLeft />
                </span>
                , если ошиблисть при вводе
              </li>
              <li>
                Нажмите
                <span className="inline-block px-1 align-middle">
                  <AiOutlineEnter />
                </span>
                для проверки введенного слова
              </li>
              <li>
                <p>
                  После каждой попытки буквы будут подсвечены разными цветами:
                </p>
                <ul>
                  <li>
                    🟢 Зелёный цвет означает, что буква находится на правильном
                    месте в слове
                  </li>
                  <li>
                    🟡 Жёлтый цвет показывает, что буква есть в слове, но стоит
                    не там
                  </li>
                  <li>
                    ⬜ Серый цвет указывает, что такой буквы нет в загаданном
                    слове
                  </li>
                </ul>
              </li>
            </ol>
          </div>
          <div>
            <p className="mb-2 font-semibold text-center">Условия победы</p>
            <ul>
              <li>
                Вы выигрываете, если угадаете слово раньше, чем закончатся
                попытки
              </li>
              <li>Если все попытки исчерпаны, игра заканчивается проигрышем</li>
            </ul>
          </div>
        </div>
        <div className="flex mt-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Все понятно
          </button>
        </div>
      </Modal>
    );
  }
  if (modalName === 'success') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Победа!'}>
        <p>Поздравляем!</p>
        <p>Вы отгадали слово!</p>
        <div className="flex mt-4">
          <button
            onClick={() => {
              onReset();
            }}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </Modal>
    );
  }
  if (modalName === 'failed') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Неудача'}>
        <p>К сожалению, вы не отгадали!</p>
        <p>Попробуете снова?</p>
        <div className="flex mt-4">
          <button
            onClick={() => onReset()}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </Modal>
    );
  }
  if (modalName === 'reset') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Начать заново'}>
        <p>Попробуете снова?</p>
        <div className="flex mt-4">
          <button
            onClick={() => onReset()}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Перезапустить
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalContainer;

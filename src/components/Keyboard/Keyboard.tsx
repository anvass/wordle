function Keyboard() {
  const KEYS = [
    'Й',
    'Ц',
    'у',
    'К',
    'Е',
    'Н',
    'Г',
    'Ш',
    'Щ',
    'З',
    'Х',
    'Ъ',
    'Ф',
    'Ы',
    'В',
    'А',
    'П',
    'Р',
    'О',
    'Л',
    'Д',
    'Ж',
    'Э',
    'Ё',
    'Я',
    'Ч',
    'С',
    'М',
    'И',
    'Т',
    'Ь',
    'Б',
    'Ю',
  ];

  const handleKeyClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(event.currentTarget.innerText.trim());
  };

  return (
    <div className="grid grid-cols-11 gap-2">
      {KEYS.map((key: string, index: number) => (
        <button
          key={index}
          className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
          onClick={(event) => handleKeyClick(event)}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;

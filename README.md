# Вордл (Wordle)

![build](https://github.com/anvass/wordle/actions/workflows/build.yml/badge.svg)


Вордл - простая и увлекательная головоломка, в которой нужно угадать слово из 5 букв за 6 попыток.

![image](./docs/assets/video.gif)


## Как играть
1) Для начала нужно вписать любое слово в верхнюю строчку игрового поля и нажать на <img src="./docs/assets/enter.png" alt="Ввод" width="30"/>
2) После каждой попытки буквы будут подсвечены разными цветами:
    - **зеленым**, если буква в вашем слове есть и стоит на том же месте, что и в загаданном слове;
    - **желтым**, если буква в вашем слове есть, но стоит не там, где надо;
    - а если ячейки вашего слова остаются **серыми**, значит в искомом слове этии буквы отсутствуют.
3) Далее, учитывая угаданные буквы, вы можете вписать новое слово, и так до тех пор, пока не угадаете загаданное слово или у вас не кончатся попытки.
Вы выигрываете, если угадаете слово раньше, чем закончатся попытки.

Если при вводе слов в строчки вы ошиблись, то символы можно стереть с помощью <img src="./docs/assets/del.png" alt="Удалить" width="30"/>


## Технологии
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

Используются следующие технологии:
- React
- Redux Toolkit
- TypeScript
- TailwindCSS
- Redux-persist для сохранения состояния в localStorage


## Планы по расширению функционала
- Загадывание слова на сутки. После окончания дня загадывается новое слово.
- Добавление статистики
- Возможность поделиться результатом в соцсетях
- Переключение языка (русский, английский)




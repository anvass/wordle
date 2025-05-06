import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';

function Footer() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth > 481 ? (
    <footer className="flex flex-col justify-end grow">
      <div className="container border-t border-neutral-300 flex w-full flex-col justify-center items-center py-5">
        <div>
          <p className="flex items-center">
            <AiOutlineCopyrightCircle />{' '}
            <span className="pl-1">{`${new Date().getFullYear()}`}</span>
          </p>
        </div>
      </div>
    </footer>
  ) : (
    ''
  );
}

export default Footer;

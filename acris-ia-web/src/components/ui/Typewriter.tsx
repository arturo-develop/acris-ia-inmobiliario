import { useState, useEffect } from 'react';

export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    // 20% slower erasing speed
    let typeSpeed = isDeleting ? 90 : 80;

    const i = loopNum % words.length;
    const fullText = words[i];

    if (!isDeleting && text === fullText) {
      // 2 full seconds pause when words are completely typed
      typeSpeed = 2000;
    } else if (isDeleting && text === '') {
      typeSpeed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        setText(
          isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words]);

  return (
    <>
      <span>{text}</span>
      <span className="text-primary animate-pulse ml-1 font-bold">|</span>
    </>
  );
}

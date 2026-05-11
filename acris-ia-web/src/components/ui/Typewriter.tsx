import { useState, useEffect } from 'react';

export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    // Sped up by 20%
    let typeSpeed = isDeleting ? 72 : 64;

    const i = loopNum % words.length;
    const fullText = words[i];

    if (!isDeleting && text === fullText) {
      // 1.6 seconds pause when words are completely typed
      typeSpeed = 1600;
    } else if (isDeleting && text === '') {
      typeSpeed = 400;
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

import React, { useEffect, useState } from 'react';

type TxtRotateProps = {
  toRotate: string[];
  period: number;
};

const TxtRotate: React.FC<TxtRotateProps> = ({ toRotate, period }) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const current = loopNum % toRotate.length;
    const fullText = toRotate[current];

    const updateText = () => {
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
    };

    const updateLoop = () => {
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      }
    };

    const tick = () => {
      updateText();
      updateLoop();
    };

    const textUpdateDelta = isDeleting ? 150 : 150 - Math.random() * 100;

    const stopDelta = isDeleting ? 500 : 2000;

    const delta = !isDeleting && text === fullText ? stopDelta : textUpdateDelta;
    const timer = setTimeout(tick, delta);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, toRotate, period]);

  return (
    <span className="txt-rotate">
      <span className="wrap">{text}</span>
    </span>
  );
};

export default TxtRotate;

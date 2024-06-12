import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import media from 'styled-media-query';

const DescriptionArea = styled.div`
  display: none;
  position: absolute;
  padding: 10px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6em;
  color: #fff;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  background: rgba(217, 217, 217, 0.50);
  backdrop-filter: blur(2px);
  width: 200px;
  z-index: 1;

  /* &::before {
    content: "";
    position: absolute;
    top: -24px;
    right: 60%;
    border: 15px solid transparent;
    border-top: 15px solid #000;
    margin-left: -15px;
    transform: rotateZ(180deg);
  } */
`

const SToolTip = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;

  p, a {
    margin:0;
    padding:0;
  }

  &:hover {
    ${DescriptionArea} {
      display: inline-block;
      top: 30px;
      left: 0px;
    }
  }
`

interface ToolTipProps {
  description: string;
  children: React.ReactNode;
}

const ToolTip: FC<ToolTipProps> = ({ description, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [childHeight, setChildHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setChildHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <SToolTip ref={ref}>
      {children}
      <DescriptionArea style={{ top: `${childHeight + 15}px` }}>{description}</DescriptionArea>
    </SToolTip>
  )
}

export default ToolTip

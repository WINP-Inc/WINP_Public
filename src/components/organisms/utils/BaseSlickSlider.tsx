import React, { FC } from 'react'
import Slider from 'react-slick';

interface BaseSlickSliderProps {
  settings: any;
  children: React.ReactNode;
}

const BaseSlickSlider: FC<BaseSlickSliderProps> = ({ settings, children }) => {
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}

export default BaseSlickSlider

import { IMicrophoneAudioTrack } from 'agora-rtc-react';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const SControlAudioSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  background: linear-gradient(to right, #5B5762 0%, #5B5762 50%, #fff 50%, #fff 100%);
  border-radius: 38px;
  margin-left: 10px;
  margin-bottom: 5px;

  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 38px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 13px;
    width: 13px;
    margin-top: -2px;
    background-color: #fff;
    border-radius: 50%;
  }
`

interface ControlAudioSliderProps {
  baseColor: string;
  activeColor: string;
  step: string;
  track?: IMicrophoneAudioTrack;
  min?: string;
  max?: string;
}

const ControlAudioSlider: FC<ControlAudioSliderProps> = ({ min, max, step, track, baseColor, activeColor }) => 
{
  const inputRef = useRef<HTMLInputElement>(null);
  const [volume, setVolume] = useState(0);

  const updateSlider = useCallback((slider: HTMLInputElement) => {
    const sliderVal: number = parseInt(slider.value);
    const sliderMax: number = parseInt(slider.max);

    const progress = (sliderVal / sliderMax) * 100;
    slider.style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`
  }, [activeColor, baseColor]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!track) return;
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    track.setVolume(newVolume);
    updateSlider(e.target);
  }

  useEffect(() => {
    if (inputRef.current) {
      updateSlider(inputRef.current);
    }
  }, [volume, updateSlider]);

  return (
    <SControlAudioSlider
      type='range'
      ref={inputRef}
      min={min}
      max={max}
      step={step}
      value={volume}
      onInput={handleVolumeChange}
    />
  )
}

export default ControlAudioSlider

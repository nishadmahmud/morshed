import React from 'react';
import SliderUi from './SliderUi';
import { userId } from '../(home)/page';

const HeroSlider = ({ slider }) => {
  return (
    <div>
      <SliderUi slider={slider} />
    </div>
  );
};

export default HeroSlider;
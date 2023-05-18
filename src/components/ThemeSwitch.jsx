import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

//! Don't change this file unless you know what you are doing

const ThemeSwitch = () => {
  const checkboxRef = useRef();
  //? sets the apps current theme according to users browser settings
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.className = 'dark';
      checkboxRef.current.checked = true;
    } else {
      document.documentElement.className = 'light';
      checkboxRef.current.checked = false;
    }
  }, []);

  //? Handle Change theme
  const handleThemeChange = () => {
    let currentTheme = document.documentElement.className;
    if (currentTheme === 'dark') {
      document.documentElement.className = 'light';
      checkboxRef.current.checked = false;
    } else {
      document.documentElement.className = 'dark';
      checkboxRef.current.checked = true;
    }
  };
  return (
    <Label
      className='themeSwitch'
      onFocus={() =>
        document.querySelector('.themeSwitch').classList.add('themeSwitchFocus')
      }
      onBlur={() =>
        document
          .querySelector('.themeSwitch')
          .classList.remove('themeSwitchFocus')
      }
    >
      <Checkbox
        type='checkbox'
        id='dark'
        onClick={handleThemeChange}
        ref={checkboxRef}
      />
      <Slider />
    </Label>
  );
};

export default ThemeSwitch;

const Label = styled.label`
  --width-of-switch: 60px;
  --height-of-switch: 30px;
  --size-of-icon: 20px;
  --slider-offset: 7px;
  border-radius: 30px;

  display: block;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);

  &.themeSwitchFocus {
    border-bottom: 3px solid var(--main-color);
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: var(--doc-bg-color);
  }
  &:checked + span:before {
    left: calc(100% - (var(--size-of-icon) + var(--slider-offset)));
    background: var(--doc-bg-color);
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f5;
  transition: 0.4s;
  border-radius: 30px;
  &:before {
    position: absolute;
    content: '';
    height: var(--size-of-icon, 1.4em);
    width: var(--size-of-icon, 1.4em);
    border-radius: 20px;
    left: var(--slider-offset, 0.3em);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    transition: 0.4s;
  }
`;

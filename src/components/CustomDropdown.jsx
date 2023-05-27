import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DownArrowIcon } from './Icons';

const CustomDropdown = ({
  options = ['no option provided'],
  inputClass,
  wrapperClass,
  label,
  doption,
  langRef,
}) => {
  const dropdownRef = useRef();

  //? this useEffect handle click outside dropdown when dropdown is active
  useEffect(() => {
    const onBodyClick = (event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }
      let dropdown = document.querySelector('.' + wrapperClass);
      dropdown.classList.remove('active');
    };
    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  //? opens dropdown
  const handleClick = () => {
    let dropdown = document.querySelector('.' + wrapperClass);
    dropdown.classList.toggle('active');
  };

  //? on selection of dropdown item
  const handleSelect = (e) => {
    document.querySelector('.' + inputClass).classList.add('valid');
    langRef.current.value = e.target.innerHTML;
  };

  return (
    <Dropdown
      className={`${wrapperClass}`}
      onClick={handleClick}
      title={label}
      ref={dropdownRef}
    >
      <Input
        type='text'
        className={inputClass}
        readOnly={true}
        required='required'
        ref={langRef}
      />
      <InputLabel>{label}</InputLabel>
      
      <OptionWrapper className='options'>
        {options.map((option, index) => (
          <Option key={index} onClick={handleSelect}>
            {option}
          </Option>
        ))}
      
      </OptionWrapper>
      <DownArrowIcon />
      <i></i>
    </Dropdown>
  );
};

export default CustomDropdown;

const Dropdown = styled.div`
  margin: auto;
  position: relative;
  width: 100%;
  background-color: transparent;
  transition: 0.2s;
  height: 64px;

  & > i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--main-color);
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
  }

  svg {
    height: 24px;
    width: 24px;
    z-index: 2;
    position: absolute;
    top: 42px;
    right: 20px;
    translate: 0 -50%;
    transition: 0.5s;
  }

  &.active svg {
    rotate: 180deg;
  }

  &.active > div,
  &:focus > div {
    display: block;
    opacity: 1;
  }
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  padding: 20px 10px 0;
  font-size: 1.2rem;
  background: transparent;
  outline: none;
  border: none;
  text-transform: capitalize;
  &.valid ~ span,
  &:focus ~ span {
    color: var(--main-color);
    top: 0;
    translate: 0 0%;
    font-size: 1rem;
  }
  &.valid ~ i,
  &:focus ~ i {
    height: 44px;
  }

  &.valid,
  &.valid ~ svg {
    color: var(--container-bg-color);
    z-index: 1;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  translate: 0 -50%;
  z-index: 3;
  font-size: 1.2rem;
  color: var(--label-color);
  pointer-events: none;
  letter-spacing: 0.1rem;
  transition: 0.5s;
`;

const OptionWrapper = styled.div`
  position: absolute;
  z-index: 7;
  bottom: 70px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: none;
  opacity: 0;
  transition: 0.25s;
  background-color: var(--doc-bg-color);
  box-shadow: var(--shadow);
`;

const Option = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: 0.5s;
  text-transform: capitalize;

  &:hover {
    background: var(--main-color);
    color: var(--hover-font-color);
  }
`;

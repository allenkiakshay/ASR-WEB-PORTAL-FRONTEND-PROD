import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DownArrowIcon } from './Icons';

const MultiSelect = ({
  options = ['no option provided'],
  setDictsList,
  inputClass,
  wrapperClass,
  label,
  dictRef,
  selectedDicts,
  setSelectedDicts,
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

  //? this useEffect changes the number of selected Dictionaries
  useEffect(() => {
    if (!!selectedDicts.length) {
      dictRef.current.value = `${selectedDicts.length} Dictionaries selected`;
    } else {
      dictRef.current.value = null;
    }
  }, [selectedDicts]);

  //? opens dropdown
  const handleClick = () => {
    let dropdown = document.querySelector('.' + wrapperClass);
    dropdown.classList.toggle('active');
  };

  //? on selection of dictionary
  const handleSelect = (e) => {
    document.querySelector('.' + inputClass).classList.add('valid');

    setSelectedDicts((p) => [
      ...p,
      {
        name: e.target.innerHTML,
        code: e.target.attributes['data-code'].value,
      },
    ]);

    setDictsList((p) => {
      p.forEach((d) => {
        if (d.name === e.target.innerHTML) d.selected = true;
      });
      return p;
    });
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
        ref={dictRef}
      />
      <InputLabel>{label}</InputLabel>
      <OptionWrapper className='options'>
        {options.map((option, index) => (
          <Option key={index} data-code={option.code} onClick={handleSelect}>
            {option.name}
          </Option>
        ))}
      </OptionWrapper>
      <DownArrowIcon />
      <i></i>
    </Dropdown>
  );
};

export default MultiSelect;

const Dropdown = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 50px;
  background-color: transparent;
  transition: 0.2s;

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
    top: 50%;
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
  padding: 12px 20px;
  font-size: 1rem;
  background: transparent;
  outline: none;
  border: none;
  text-transform: capitalize;
  &.valid ~ span,
  &:focus ~ span {
    color: var(--main-color);
    transform: translateY(-34px);
    font-size: 0.9rem;
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
  top: 0;
  z-index: 3;
  padding: 20px 0px 10px;
  font-size: 1rem;
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
  max-height: 50vh;
  overflow: scroll;
  border-radius: 10px;
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

//? this component handle how to show selected Dictionaries
export const ShowSelectedDict = ({
  selectedDicts,
  setSelectedDicts,
  setDictsList,
}) => {
  return (
    <Container>
      {!!selectedDicts.length
        ? selectedDicts.map((dict, index) => (
            <BadgeWrapper key={index}>
              {dict.name}
              <CrossSign
                onClick={() => {
                  setSelectedDicts((p) =>
                    p.filter((d) => d.name !== dict.name)
                  );
                  setDictsList((p) => {
                    p.forEach((d) => {
                      if (d.name === dict.name) d.selected = false;
                    });
                    return p;
                  });
                }}
              />
            </BadgeWrapper>
          ))
        : 'No Dictionaries selected'}
    </Container>
  );
};

const Container = styled.div`
  text-align: justify;
`;

const BadgeWrapper = styled.div`
  height: 2rem;
  line-height: 18px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.25px;
  text-overflow: ellipsis;
  overflow: hidden;
  background: var(--main-color);
  color: var(--container-bg-color);
  margin-right: 5px;
  margin-bottom: 5px;
`;

const CrossSign = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: 5px;
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 50%;

  &:hover,
  &:focus {
    background: var(--container-bg-color);
    &::before,
    &::after {
      background: var(--main-color);
    }
  }

  &::before,
  &::after {
    width: 15px;
    height: 2px;
    position: absolute;
    content: '';
    left: 0;
    background: var(--container-bg-color);
    translate: 0 7px;
  }
  &::before {
    top: -8px;
    transform: translateY(8px) rotate(45deg);
  }
  &::after {
    top: 8px;
    transform: translateY(-8px) rotate(-45deg);
  }
`;

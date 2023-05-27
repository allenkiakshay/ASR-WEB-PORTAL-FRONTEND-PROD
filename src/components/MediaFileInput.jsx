import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {  UploadIcon } from './Icons';

const MediaFileInput = ({ handleFileChange, tabSelected, fileRef }) => {
  //? Refs and local States
  const labelRef = useRef();
  const dropdownRef = useRef();
  const [options, setOptions] = useState([
    'Upload a Video or Audio File',
    'Select a Previously Uploaded File',
    'Add URL of a Video',
  ]);

  //? this useEffect handle click outside dropdown when dropdown is active
  useEffect(() => {
    const onBodyClick = (event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }
      dropdownRef.current.classList.remove('active');
    };
    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  //? change input label according to tab selected
  useEffect(() => {
    let FirstOptionValue =
      tabSelected === 'transcript' || tabSelected === 'V2V'
        ? 'Upload a Video or Audio File'
        : tabSelected === 'TTS'
        ? 'Upload Translation File(.xml)'
        : 'Upload Transcript File(.xml)';
    labelRef.current.value = FirstOptionValue;
    setOptions([FirstOptionValue, ...options.slice(1)]);
  }, [tabSelected]);

  //? change label according to what selected from label dropdown
  const handleSelect = (e) => {
    document.querySelector('.LabelInput').classList.add('valid');
    labelRef.current.value = e.target.innerHTML;
    dropdownRef.current.classList.remove('active');
  };

  return (
    <FileInputWrapper>
      {/* Label Dropdown */}
      <Dropdown ref={dropdownRef}>
        <NameInput
          type='text'
          className='LabelInput'
          readOnly={true}
          required={true}
          ref={labelRef}
          defaultValue='Upload a Video or Audio File'
          onClick={() => dropdownRef.current.classList.toggle('active')}
        />
        <OptionWrapper className='options'>
          {options.map((option, index) => (
            <LabelOption key={index} onClick={handleSelect}>
              {option}
            </LabelOption>
          ))}
        </OptionWrapper>
        
      </Dropdown>
      {/* File Input */}
      <FileInput
        type='file'
        name='mediaFile'
        id='mediaFile'
        accept={
          tabSelected === 'transcript' || tabSelected === 'V2V'
            ? 'video/*, audio/*'
            : 'text/xml'
        }
        onChange={handleFileChange}
        ref={fileRef}
      />
      <FileInputLabel htmlFor='mediaFile'>
        <strong>
          <UploadIcon />
          Upload a file…
        </strong>
        {/* Name of file which is uploaded */}
        <span id='file-name'></span>
      </FileInputLabel>
    </FileInputWrapper>
  );
};

export default MediaFileInput;

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 35px;
  display: flex;
  height: 64px;
`;

const FileInputLabel = styled.label`
  border: 1px solid var(--main-color);
  background-color: var(--input-form-bg-color);
  width: 100%;
  height: 44px;
  border-radius: 10px;
  color: var(--main-color);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  padding: 5px 1.25rem;
  align-self: flex-end;

  & > span {
    width: 60%;
    max-width: 20vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & > strong {
    color: var(--doc-bg-color);
    background-color: var(--main-color);
    padding: 5px 25px;
    border-radius: 10px;
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 600;
    transition: 0.2s;
    box-shadow: var(--shadow);
    &:active {
      translate: 0 2px;
    }
  }

  svg {
    margin-right: 5px;
    height: 16px;
    width: 16px;
  }
`;

const Dropdown = styled.div`
  margin: auto;
  position: absolute;
  width: 100%;
  height: 1rem;

  svg {
    height: 1rem;
    position: absolute;
    right: 5px;
    top: 50%;
    translate: 0 -50%;
    transition: 0.5s;
    color: var(--main-color);
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

const NameInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 1rem;
  background: transparent;
  outline: none;
  border: none;
  text-transform: capitalize;
  color: var(--main-color);
`;

const OptionWrapper = styled.div`
  position: absolute;
  z-index: 7;
  bottom: 2rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: none;
  opacity: 0;
  transition: 0.25s;
  background-color: var(--doc-bg-color);
  box-shadow: var(--shadow);
`;

const LabelOption = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: 0.5s;
  text-transform: capitalize;

  &:hover {
    background: var(--main-color);
    color: var(--hover-font-color);
  }
`;

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  &:focus ~ label {
    background: var(--main-color);
    color: var(--doc-bg-color);
  }
`;

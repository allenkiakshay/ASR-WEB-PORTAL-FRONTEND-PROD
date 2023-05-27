import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';

import { db } from '../Firebase';
import { dict } from '../assets/dict';
import HomeTabs from '../components/HomeTabs';
import ErrorModal from '../components/ErrorModal';
import { handleFileUpload } from '../hooks/FileUpload';
import ProgressModal from '../components/ProgressModal';
import CustomDropdown from '../components/CustomDropdown';
import MediaFileInput from '../components/MediaFileInput';
import MultiSelect, { ShowSelectedDict } from '../components/MultiSelect';

// ? All Language Options for Dropdown
const LanguageOptions = [
  'English',
  'Assamese',
  'Hindi',
  'Marathi',
  'Tamil',
  'Bengali',
  'Kannada',
  'Odia',
  'Telugu',
  'Gujarati',
  'Malayalam',
  'Punjabi',
];

const Home = () => {
  //? refs for all input fields.
  const fileRef = useRef();
  const docNameRef = useRef();
  const sourceLangRef = useRef();
  const targetLangRef = useRef();
  const dictRef = useRef();
  const errorRef = useRef();
  const submitButtonRef = useRef();

  // ? states for redux
  const user = useSelector((state) => state.userState.user);
  const errorStatus = useSelector((state) => state.errorState.status);
  const dispatch = useDispatch();

  // ? all local States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabSelected, setTabSelected] = useState('transcript');
  const [dictsList, setDictsList] = useState(dict);
  const [selectedDicts, setSelectedDicts] = useState([]);
  const [progressData, setProgressData] = useState({
    done: 0,
    total: 0,
    progress: 0,
    rate: 0,
    estimated: 0,
  });

  let cancelToken;

  //? if media file changes then change the name in file label.
  const handleFileChange = (e) => {
    if (!!e.target.files)
      document.getElementById('file-name').innerHTML = e.target.files[0].name;
  };

  //? something
  const handleSubmit = () => {
    //? Reference for where to store the doc in DB
    const collectionRef = collection(db, 'usersList', user.data, 'docs');

    //? check if File and Doc Name exist
    if (!!fileRef.current.files[0] && !!docNameRef.current.value) {
      //? check if transcript tab is selected
      if (tabSelected === 'transcript') {
        setIsModalOpen(true); //? set Progress Modal to open
        handleFileUpload(
          fileRef,
          docNameRef.current.value,
          '-',
          '-',
          dispatch,
          collectionRef,
          cancelToken,
          setProgressData,
          setIsModalOpen,
          tabSelected
        );
        //? check if there exist source and target language.
      } else if (
        !!sourceLangRef.current.value &&
        !!targetLangRef.current.value &&
        !(sourceLangRef.current.value === targetLangRef.current.value)
      ) {
        //? check if TTS tab is selected
        if (tabSelected === 'TTS') {
          setIsModalOpen(true); //? set Progress Modal to open
          handleFileUpload(
            fileRef,
            docNameRef.current.value,
            sourceLangRef.current.value,
            targetLangRef.current.value,
            dispatch,
            collectionRef,
            cancelToken,
            setProgressData,
            setIsModalOpen,
            tabSelected
          );
        } else {
          //? check if there exist at least one Dictionary
          if (!!selectedDicts.length) {
            //? check if translation tab is selected.
            if (tabSelected === 'translation') {
              setIsModalOpen(true); //? set Progress Modal to open
              handleFileUpload(
                fileRef,
                docNameRef.current.value,
                sourceLangRef.current.value,
                targetLangRef.current.value,
                dispatch,
                collectionRef,
                cancelToken,
                setProgressData,
                setIsModalOpen,
                tabSelected,
                selectedDicts
              );
              //? check if V2V tab is selected.
            } else if (tabSelected === 'V2V') {
              setIsModalOpen(true); //? set Progress Modal to open
              handleFileUpload(
                fileRef,
                docNameRef.current.value,
                sourceLangRef.current.value,
                targetLangRef.current.value,
                dispatch,
                collectionRef,
                cancelToken,
                setProgressData,
                setIsModalOpen,
                tabSelected,
                selectedDicts
              );
            }
          } else {
            errorRef.current.innerHTML = 'Please select at least 1 Dictionary.';
          }
        }
      } else {
        errorRef.current.innerHTML = !sourceLangRef.current.value
          ? 'Source Language is Missing. '
          : !targetLangRef.current.value
          ? 'Target Language is Missing. '
          : sourceLangRef.current.value === targetLangRef.current.value
          ? "Source and Target Language can't be same. "
          : '';
      }
    } else {
      errorRef.current.innerHTML =
        (!fileRef.current.files[0] ? 'Media file is Missing. ' : '') +
        (!docNameRef.current.value ? 'Document Name is Missing. ' : '');
    }
  };

  return (
    <React.Fragment>
      {
        !user && <Navigate to='/' />
        /* If user not loggedIn redirect to Login Page */
      }
      {
        errorStatus && <ErrorModal />
        /* If there is error then show error Modal (except form errors) */
      }
      <Container>
        <Heading>ASR Post Editor Tool</Heading>
        {/* Instructions Copied from Udann project need to be updated */}
        <Instructions aria-label='Instructions:'>
          <li>File name should be greater than 5 characters.</li>
          <li>Audio or Video name shouldn&#39;t contain any white spaces.</li>
          <li>
            First upload the Audio or Video file, then enter other fields.
          </li>
          <li>
            Uploading Audio or Video file size should be less than{' '}
            <strong>
              <em>1024 MB</em>
            </strong>
            .
          </li>
        </Instructions>
        {/* Any error from Form will be shown here. */}
        <ErrorMessage ref={errorRef}></ErrorMessage>
        <InnerContainer>
          {/* Secondary NavBar */}
          <HomeTabs tabSelected={tabSelected} setTabSelected={setTabSelected} />
          <FormWrapper>
            {/* File Input for Translation, Transcript, TTS, V2V. */}
            <InputWrappers 
               visible={!(tabSelected === 'custom') ? true : false}
            >
            <MediaFileInput
              handleFileChange={handleFileChange}
              tabSelected={tabSelected}
              fileRef={fileRef}
             /> 
             
            </InputWrappers>

            {/* Link input for youtube tab */}
            <InputWrapper visible={tabSelected === 'custom' ? true : false}>
              <InputField type='text' required='required' ref={docNameRef} />
              <InputLabel>Paste Youtube Link Here</InputLabel>
              <i></i>
            </InputWrapper>
            {/* Input for Document Name. */} 
            <InputWrapper visible={true}>
              <InputField type='text' required='required' ref={docNameRef} />
              <InputLabel>Output File Name</InputLabel>
              <i></i>
            </InputWrapper>
            {/* Dropdown for Source Language */}
            <InputWrapper
              visible={true}
            >
              <CustomDropdown
                inputClass='sourcelang'
                wrapperClass='sourceDropdown'
                options={LanguageOptions}
                label='Select Source Language'
                langRef={sourceLangRef}
              />
            </InputWrapper>
            {/* Dropdown for Target Language */}
            <InputWrapper
              visible={!(tabSelected === 'transcript') ? true : false}
            >
              <CustomDropdown
                inputClass='targetlang'
                wrapperClass='targetDropdown'
                options={LanguageOptions}
                label='Select Target Language'
                langRef={targetLangRef}
              />
            </InputWrapper>
            {/* Select dictionaries from this multiselect dropdown. */}
            <InputWrapper
              visible={
                tabSelected === 'translation' || tabSelected === 'V2V'
                  ? true
                  : false
              }
            >
              <MultiSelect
                inputClass='dict'
                wrapperClass='dictMultiSelect'
                options={dictsList.filter((dict) => !dict.selected && dict)}
                setDictsList={setDictsList}
                label='Select Dictionaries'
                dictRef={dictRef}
                selectedDicts={selectedDicts}
                setSelectedDicts={setSelectedDicts}
              />
            </InputWrapper>
            {/* All Selected Dictionaries Will be shown here.*/}
            <InputWrapper
              visible={
                tabSelected === 'translation' || tabSelected === 'V2V'
                  ? true
                  : false
              }
            >
              <ShowSelectedDict
                selectedDicts={selectedDicts}
                setSelectedDicts={setSelectedDicts}
                setDictsList={setDictsList}
              />
            </InputWrapper>
            <SubmitButton onClick={handleSubmit} ref={submitButtonRef}>
              Convert
            </SubmitButton>
          </FormWrapper>
        </InnerContainer>
      </Container>
      {isModalOpen && (
        <ProgressModal
          progressData={progressData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </React.Fragment>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-top: 2rem;
  width: 95%;
  max-width: max-content;
  align-self: center;
`;

const Instructions = styled.ul`
  width: 95%;
  max-width: max-content;
  align-self: center;
  margin-top: 2rem;
  text-align: justify;
  background-color: var(--instructions-color);
  padding: 20px;
  padding-left: 40px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  color: black;
  &:before {
    content: attr(aria-label);
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: -15px;
  }
`;

const ErrorMessage = styled.h3`
  margin: 20px;
  font-size: 2rem;
  max-height: max-content;
  color: var(--error-color);
`;

const InnerContainer = styled.div`
  width: 95%;
  max-width: 1350px;
  border-radius: 10px;
  background: var(--input-form-bg-color);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const FormWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 40px;
  display:grid;
  gap: 20px;
  flex-direction: column;
  @media (max-width: 800px) {
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 35px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
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
`;

const InputWrappers = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 3px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
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
`;

const InputField = styled.input`
  position: relative;
  width: 100%;
  padding: 20px 10px 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--container-bg-color);
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  z-index: 6;

  &:valid ~ span,
  &:focus ~ span {
    color: var(--main-color);
    top: 0;
    translate: 0 0%;
    font-size: 1rem;
  }
  &:valid ~ i,
  &:focus ~ i {
    height: 44px;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  translate: 0 -50%;
  font-size: 1.2rem;
  color: var(--label-color);
  pointer-events: none;
  letter-spacing: 0.1rem;
  transition: 0.5s;
`;

const SubmitButton = styled.button`
  margin: auto;
  border: none;
  background: var(--main-color);
  color: var(--doc-bg-color);
  padding: 11px 25px;
  width: 100%;
  max-width: max-content;
  align-self: center;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  grid-column: 1/-1;
  &:hover,
  &:focus {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;

const DefWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-direction: column;
`
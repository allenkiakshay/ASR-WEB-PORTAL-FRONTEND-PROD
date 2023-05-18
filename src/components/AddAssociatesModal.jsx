import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import { db } from '../Firebase';

const AddAssociatesModal = ({ addAssociates, setAddAssociates }) => {
  //? get the doc from redux store which needed to be shared with associates
  const Doc = useSelector((state) => state.userState.docs).find(
    (doc) => addAssociates.id === doc.id
  );

  const emailRef = useRef();

  /* //? add doc to respective associate's data
  const handleSubmit = async () => {
    await addDoc(
      collection(db, 'usersList', emailRef.current.value, 'docs'),
      Doc
    );
    setAddAssociates({ id: '', status: false });
  }; */

  return (
    <Container>
      <InnerContainer>
        <FormWrapper>
          <InputWrapper visible={true}>
            <InputField type='email' required='required' ref={emailRef} />
            <InputLabel>Enter Email Id of Associate</InputLabel>
            <i></i>
          </InputWrapper>
          <StyledButton onClick={handleSubmit}>Add</StyledButton>
          <StyledButton
            onClick={() => setAddAssociates({ id: '', status: false })}
          >
            Close
          </StyledButton>
        </FormWrapper>
      </InnerContainer>
    </Container>
  );
};

export default AddAssociatesModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
`;

const InnerContainer = styled.div`
  max-width: 1350px;
  width: 95%;
  background: var(--container-bg-color);
  position: relative;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const FormWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 40px;
  display: grid;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 800px) {
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    grid-template-columns: 3fr 1fr 1fr;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
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

const StyledButton = styled.button`
  margin: auto;
  border: none;
  background: var(--main-color);
  color: var(--doc-bg-color);
  padding: 11px 25px;
  width: 100%;
  max-width: max-content;
  align-self: center;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  &:hover,
  &:focus {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;

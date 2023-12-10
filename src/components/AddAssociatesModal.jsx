import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

const AddAssociatesModal = ({ addAssociates, setAddAssociates }) => {

  const emailRef = useRef(null);

  const user = useSelector((state) => state.userState.user);

  const [Response, setResponse] = useState('');
  const [Associates, setAssociates] = useState([]);
  const [owner, setOwner] = useState(false);

  const handleSubmit = async () => {
    const enteredEmail = emailRef.current.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      setResponse('Please enter a valid email address.');
      return;
    }
    const data = {
      email: emailRef.current.value,
      token: addAssociates,
      user: user.user,
    };

    const replacer = (key, value) => {
      if (key === 'circularReference') {
        return '[Circular Reference]';
      }
      return value;
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/associate/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, replacer),

      });
      if (!response.ok) {
        throw new Error('Failed to Add Associate');
      }

      const responseData = await response.json();
      if (responseData.message === "User doesn't exist" || responseData.message === "User Already Associated" || responseData.message === 'Token not found in the "preview" table' || responseData.message === "You Cannot add an Associate Because You are not the Creator of this file") {
        setResponse(responseData.message);
      }
      else {
        setResponse(responseData.message);
        setAddAssociates(null);
        window.alert(responseData.message);
      }
    } catch (error) {
      setResponse(error.message); // Set the error message
      console.error('Error posting data:', error);
    }
  };

  const data = {
    email: user.user,
    token: addAssociates
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5555/associate/fetch', data);
        setAssociates(response.data.associates);
        setOwner(response.data.Status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {owner === false ? (
        <Container>
          <InnerContainer>
            <h3 colSpan='12'>You Don't Have Access to See or Add the Associates</h3>
            <StyledButton onClick={() => setAddAssociates(null)}>Close</StyledButton>
          </InnerContainer>
        </Container>
      ) : (
        <Container>
          <InnerContainer>
            <FormWrapper>
              <InputWrapper visible={true}>
                <InputField type='email' required ref={emailRef} />
                <InputLabel>Enter Email Id of Associate</InputLabel>
                <i></i>
              </InputWrapper>
              <StyledButton onClick={handleSubmit}>Add</StyledButton>
              <StyledButton
                onClick={() => setAddAssociates(null)}
              >
                Close
              </StyledButton>
              <div style={{ color: 'red' }}>
                <a>{Response}</a>
              </div>
            </FormWrapper>
            <h1>Present Associates</h1>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {!Associates.length ? (
                  <div>
                    <h2>No Associates Present</h2>
                  </div>
                ) : (
                  Associates.map(({ name, email }, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </InnerContainer>
        </Container>
      )}
    </div>
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
  padding-bottom: 10px;
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

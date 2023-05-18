import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addError, changeStatus } from '../redux/slice/errorSlice';

const ErrorModal = () => {
  //? Redux State
  const errorData = useSelector((state) => state.errorState.error);
  const dispatch = useDispatch();

  return (
    <Container>
      <InnerContainer>
        {!!errorData.name && (
          <Heading>We have encountered an {errorData.name}.</Heading>
        )}
        {!!errorData.message && (
          <SubHeading>Message is: {errorData.message}</SubHeading>
        )}
        {!!errorData.code && <SubHeading>Code is: {errorData.code}</SubHeading>}
        <p>
          Report this error to:{' '}
          <a
            href={`mailto:rohit712wd@gmail.com?subject=Encountered an ${
              !!errorData.name ? errorData.name : 'Error'
            }!&body=${JSON.stringify(errorData)}`}
          >
            our Web Developer
          </a>
        </p>
        <CloseButton
          onClick={() => {
            dispatch(addError(null));
            dispatch(changeStatus(false));
          }}
        >
          Close
        </CloseButton>
      </InnerContainer>
    </Container>
  );
};

export default ErrorModal;

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

const Heading = styled.h2`
  font-size: 2rem;
  width: max-content;
  max-width: 95%;
  text-align: center;
  align-self: center;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  width: 95%;
  align-self: center;
  text-align: center;
`;

const CloseButton = styled.button`
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
  &:hover,
  &:focus {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;

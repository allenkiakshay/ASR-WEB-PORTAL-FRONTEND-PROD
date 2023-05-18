import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

/* 
? A simple error page to tell user what is going on.
*/

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Container id='error-page'>
      <h1>Oops!!</h1>
      <p>An unexpected error has occurred.</p>
      <p>Try refreshing the page...</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

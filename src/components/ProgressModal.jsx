import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CheckIcon, EqualIcon, GaugeHighIcon, HourglassIcon } from './Icons';

//? Just a simple progress modal

const ProgressModal = ({ progressData, setIsModalOpen }) => {
  return (
    <Container>
      <InnerContainer>
        {progressData.progress === 100 ? (
          <React.Fragment>
            <Heading>Upload Successful</Heading>
            <SubHeading>
              You will be notified with mail when transcript is generated
              successfully.
            </SubHeading>
            <Link to='/preview'>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                Close
              </CloseButton>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ProgressBar progress={progressData.progress} />
            <Data>
              <DataItem title='File Size'>
                <EqualIcon />
                {progressData.total} MB
              </DataItem>
              <DataItem title='Done '>
                <CheckIcon />
                {progressData.done} MB
              </DataItem>
              <DataItem title='Upload Speed'>
                <GaugeHighIcon />
                {progressData.rate} MB/s
              </DataItem>
              <DataItem title='Remaining Time'>
                <HourglassIcon />
                {progressData.estimated} Sec
              </DataItem>
            </Data>
          </React.Fragment>
        )}
      </InnerContainer>
    </Container>
  );
};

export default ProgressModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 8;
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

const ProgressBar = styled.div`
  width: 70%;
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);

  &::after {
    content: '';
    display: block;
    height: 16px;
    border-radius: 4px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
      inset 0 1px rgba(255, 255, 255, 0.1);
    width: ${({ progress }) => progress}%;
    background-color: #86e01e;
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Data = styled.div`
  display: grid;
  gap: 30px;
  font-size: 1.5rem;
  @media (max-width: 800px) {
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const DataItem = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 30px;
    height: 30px;
  }
`;

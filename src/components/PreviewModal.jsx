import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';

/*
  ? Just a simple Preview Modal
 ? ace editor is used for text preview - https://securingsincity.github.io/react-ace/
*/

const PreviewModal = ({ previewData, setPreviewData }) => {
  return (
    <Container>
      <InnerContainer>
        <CloseButton onClick={() => setPreviewData({ dataType: '', data: '' })}>
          Close
        </CloseButton>
        {previewData.dataType !== 'audio' ? (
          <AceEditor
            fontSize='1rem'
            name='UNIQUE_ID_OF_DIV'
            value={previewData.data}
            width='100%'
            readOnly
            wrapEnabled
            showPrintMargin={false}
            style={{
              background: ' var(--container-bg-color)',
              color: 'var(--doc-font-color)',
            }}
          />
        ) : (
          <audio src={previewData.data} controls />
        )}
      </InnerContainer>
    </Container>
  );
};

export default PreviewModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
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
  box-shadow: var(--shadow);
  .ace_gutter {
    background: var(--container-bg-color);
    color: var(--doc-font-color);
  }
  .ace_gutter-active-line {
    background-color: var(--container-bg-color);
  }
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

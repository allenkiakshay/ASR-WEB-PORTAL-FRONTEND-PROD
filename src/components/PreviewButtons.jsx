import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { handleDownload, handlePreview } from '../hooks/PreviewActions';
import { DownloadIcon, PreviewIcon, UploadIcon } from './Icons';

const PreviewButtons = ({
  docName,
  token,
  setPreviewData,
  setIsPending,
  willGenerate,
}) => {
  const dispatch = useDispatch();

  /* 
  ? Simple logic if file generated is TTS then only TTS column have buttons rest will be "-".
  * I know code can be refactored but don't have enough time to do so.
   */
  return (
    <React.Fragment>
      {willGenerate === 'transcript' ? (
        <td>
          <ButtonGroup>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handlePreview(
                  'transcript',
                  token,
                  setPreviewData,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <PreviewIcon />
              <i></i>
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handleDownload(
                  'transcript',
                  docName,
                  token,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <DownloadIcon />
              <i></i>
            </Button>
            <Button className='button' onClick={handleAnimation}>
              <UploadIcon />
              <i></i>
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>-</td>
      )}
      {willGenerate === 'translation' ? (
        <td>
          <ButtonGroup>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handlePreview(
                  'translation',
                  token,
                  setPreviewData,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <PreviewIcon />
              <i></i>
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handleDownload(
                  'translation',
                  docName,
                  token,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <DownloadIcon />
              <i></i>
            </Button>
            <Button className='button' onClick={handleAnimation}>
              <UploadIcon />
              <i></i>
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>-</td>
      )}
      {willGenerate === 'TTS' ? (
        <td>
          <ButtonGroup>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handlePreview(
                  'TTS',
                  token,
                  setPreviewData,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <PreviewIcon />
              <i></i>
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handleDownload('TTS', docName, token, setIsPending, dispatch);
              }}
            >
              <DownloadIcon />
              <i></i>
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>-</td>
      )}
      {willGenerate === 'V2V' ? (
        <td>
          <ButtonGroup>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handlePreview(
                  'TTS',
                  token,
                  setPreviewData,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <PreviewIcon />
              <i></i>
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handleDownload('TTS', docName, token, setIsPending, dispatch);
              }}
            >
              <DownloadIcon />
              <i></i>
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>-</td>
      )}
      {willGenerate === 'custom' ? (
        <td>
          <ButtonGroup>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handlePreview(
                  'TTS',
                  token,
                  setPreviewData,
                  setIsPending,
                  dispatch
                );
              }}
            >
              <PreviewIcon />
              <i></i>
            </Button>
            <Button
              className='button'
              onClick={(e) => {
                handleAnimation(e);
                handleDownload('TTS', docName, token, setIsPending, dispatch);
              }}
            >
              <DownloadIcon />
              <i></i>
            </Button>
          </ButtonGroup>
        </td>
      ) : (
        <td>-</td>
      )}
    </React.Fragment>
  );
};

export default PreviewButtons;

//* It is just for animation in Button Group.
const handleAnimation = (e) => {
  e.target.classList.toggle('active');
  setTimeout(() => {
    e.target.classList.toggle('active');
  }, 200);
};

export const ButtonGroup = styled.div`
  margin: 0 auto;
  width: max-content;
  max-height: 40px;
  overflow: hidden;
  border-radius: 10px;
`;

export const Button = styled.button`
  background: transparent;
  border: 0;
  outline: none;
  background: var(--container-bg-color);
  color: var(--doc-font-color);
  border: none;
  width: 40px;
  height: 40px;
  padding: 6px;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  position: relative;
  transition: 0.01s;

  & > svg {
    text-align: center;
    margin: 6px;
    display: block;
  }
  &:hover,
  &:focus {
    background: var(--table-header-color);
  }

  &.active {
    font-size: 16px;
    text-shadow: 0 0 10px #fff;
    background: var(--table-header-color);
    vertical-align: bottom;
  }

  &.active svg {
    text-shadow: 0 0 10px #fff;
    margin-top: 6px;
    font-size: 14px;
  }

  &.active:before {
    content: '';
    position: absolute;
    z-index: 7;
    left: 0px;
    top: 0px;
    border-top: 33px solid var(--main-color);
    border-right: 8px solid transparent;
  }
  &.active:after {
    content: '';
    position: absolute;
    z-index: 7;
    right: 0px;
    top: 0px;
    border-top: 33px solid var(--main-color);
    border-left: 8px solid transparent;
  }

  &.active i:before {
    content: '';
    position: absolute;
    z-index: 7;
    left: 0px;
    top: -6px;
    border-bottom: 6px solid var(--main-color);
    border-right: 8px solid transparent;
  }

  &.active i:after {
    content: '';
    position: absolute;
    z-index: 7;
    right: 0px;
    top: -6px;
    border-bottom: 6px solid var(--main-color);
    border-left: 8px solid transparent;
  }

  &:active {
    transform: translateY(2px);
  }
`;

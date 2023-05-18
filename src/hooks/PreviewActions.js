import axios from 'axios';
import { convertXML } from 'simple-xml-to-json';
import { addError, changeStatus } from '../redux/slice/errorSlice';

export const handlePreview = (
  callType,
  token,
  setPreviewData,
  setIsPending,
  dispatch
) => {
  //? backend API url
  const URL = `${import.meta.env.VITE_API_URL}/${callType}/${token}`;

  //? check if file is generated
  axios({
    method: 'get',
    url: URL,
  })
    .then(function (response) {
      if (response.data === 'SUCCESS') {
        //? TTS generates .mp3 file so logic is little different
        //? if not TTS then convert response to XML
        if (callType !== 'TTS') {
          axios({
            method: 'get',
            url: `${URL}/result`,
          })
            .then(function (res) {
              const { transcript } = convertXML(res.data);
              let fileContent = '';
              transcript.children.forEach(({ line }) => {
                let lineContent = '';
                line.children.forEach(({ word }) => {
                  if (!!word.content) lineContent += ` ${word.content}`;
                });
                fileContent += `[${line.speaker}] ${lineContent} [${line.timestamp}]\n`;
              });
              setPreviewData({ dataType: 'text', data: fileContent });
            })
            .catch(function (err) {
              dispatch(addError(err));
              dispatch(changeStatus(true));
            });
          //? if TTS the convert response into mp3 for preview
        } else {
          axios({
            method: 'get',
            url: `${URL}/result`,
            responseType: 'blob',
          })
            .then(function (res) {
              const fileURL = window.URL.createObjectURL(res.data);
              setPreviewData({ dataType: 'audio', data: fileURL });
            })
            .catch(function (err) {
              dispatch(addError(err));
              dispatch(changeStatus(true));
            });
        }
        //? if server is failed to generate file
      } else if (response.data === 'FAILURE') {
        const err = {
          name: 'File Generation Error',
          message: 'Server failed to generate Translation.',
          code: 'FILE_GEN_FAILURE',
        };
        dispatch(addError(err));
        dispatch(changeStatus(true));
        //? if server is still working on file generation
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (err) {
      dispatch(addError(err));
      dispatch(changeStatus(true));
    });
};

export const handleDownload = (
  callType,
  docName,
  token,
  setIsPending,
  dispatch
) => {
  //? backend API url
  const URL = `${import.meta.env.VITE_API_URL}/${callType}/${token}`;

  //? check if file is generated
  axios({
    method: 'get',
    url: URL,
  })
    .then(function (response) {
      if (response.data === 'SUCCESS') {
        axios({
          method: 'get',
          url: `${URL}/result`,
          responseType: 'blob',
        })
          .then(function (res) {
            const fileURL = window.URL.createObjectURL(res.data);
            let alink = document.createElement('a');
            alink.href = fileURL;
            //? if not TTS then convert response to XML and save as .xml file
            if (callType !== 'TTS')
              alink.download = `${callType}_${docName}.xml`;
            else alink.download = `${callType}_${docName}.mp3`;
            //? if TTS the convert response into mp3 and save as .mp3 file
            alink.click();
          })
          .catch(function (err) {
            dispatch(addError(err));
            dispatch(changeStatus(true));
          });
        //? if server is failed to generate file
      } else if (response.data === 'FAILURE') {
        const err = {
          name: 'File Generation Error',
          message: 'Server failed to generate Translation.',
          code: 'FILE_GEN_FAILURE',
        };
        dispatch(addError(err));
        dispatch(changeStatus(true));
        //? if server is still working on file generation
      } else {
        setIsPending(() => ({ status: true, name: callType }));
        setTimeout(() => {
          setIsPending(() => ({ status: false, name: callType }));
        }, 10000);
      }
    })
    .catch(function (err) {
      dispatch(addError(err));
      dispatch(changeStatus(true));
    });
};

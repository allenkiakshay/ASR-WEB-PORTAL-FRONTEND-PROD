import axios from 'axios';
import moment from 'moment';
import { addDoc, serverTimestamp } from 'firebase/firestore';

import { addDocs } from '../redux/slice/userSlice';
import { addError, changeStatus } from '../redux/slice/errorSlice';

export const handleFileUpload = async (
  file,
  docName,
  sourceLang,
  targetLang,
  dispatch,
  collectionRef,
  cancelToken,
  setProgressData,
  setIsModalOpen,
  tabSelected
) => {
  let headersForTab;

  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }

  //? setting headers according to different request type
  switch (tabSelected) {
    case 'translation':
      headersForTab = {
        'Content-Type': 'multipart/form-data',
        source_language: sourceLang.toLowerCase(),
        destination_language: targetLang.toLowerCase(),
      };
      break;
    case 'TTS':
      headersForTab = {
        'Content-Type': 'multipart/form-data',
        output_language: `${targetLang} Male`,
      };
      break;
    default:
      headersForTab = {
        'Content-Type': 'multipart/form-data',
      };
      break;
  }

  const formData = new FormData();
  formData.append('file', file.current.files[0]);
  cancelToken = axios.CancelToken.source();

  try {
    //?  sending data to backend
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/${tabSelected}`,
      withCredentials: false,
      data: formData,
      headers: headersForTab,
      onUploadProgress: (p) => {
        //? for upload progress
        setProgressData({
          done: parseInt(p.loaded / 1048576),
          total: parseInt(p.total / 1048576),
          progress: parseInt(p.progress * 100),
          rate: parseFloat(p.rate / 1048576).toFixed(2),
          estimated: parseInt(p.estimated),
        });
      },
      cancelToken: cancelToken.token,
    }).then(async function (response) {
      const creationTime = moment(Date().toLocaleString()).format(
        'MMM DD, YYYY | hh:mm A'
      );
      const data = {
        mediaName: file.current.files[0].name,
        docName: docName,
        language: `${sourceLang} | ${targetLang}`,
        creationTime: creationTime,
        modifyTime: creationTime,
        token: response.data,
        willGenerate: tabSelected,
        timestamp: serverTimestamp(),
      };
      //? saving data to Firestore DB
      await addDoc(collectionRef, data);
      dispatch(addDocs(data));
    });
  } catch (err) {
    dispatch(addError(err));
    dispatch(changeStatus(true));
    setIsModalOpen(false);
  }
  //? -------This block reset the form.-------
  file.current.value = null;
  docName = null;
  sourceLang = null;
  targetLang = null;
  document.getElementById('file-name').innerHTML = null;
  document
    .querySelectorAll('.valid')
    .forEach((box) => box.classList.remove('valid'));
  //? -------This block reset the form.-------
};

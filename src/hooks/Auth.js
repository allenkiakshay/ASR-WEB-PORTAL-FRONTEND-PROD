// import jwtDecode from 'jwt-decode';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import { db } from '../Firebase';
import { addUser, setDocs } from '../redux/slice/userSlice';

export const handleGoogleSignIn = async (res, dispatch) => {
  //? decode the JWT response from google Sign in
  // const data = jwtDecode(res.credential);

  const userSnap = await getDoc(doc(db, 'usersList', res));
  //? check if user exists and populate the app with user data
  if (userSnap.exists()) {
    const q = query(
      collection(db, 'usersList', res, 'docs'),
      orderBy('timestamp', 'desc')
    );
    const docSnap = await getDocs(q);

    const allDocs = [];
    docSnap.forEach((doc) => allDocs.push({ id: doc.id, ...doc.data() }));
    !!docSnap.size && dispatch(setDocs(allDocs));
    //? create new user
  } else {
    await setDoc(doc(db, 'usersList', res), {
      data: res,
    });
  }
  dispatch(addUser({data:res}));
};

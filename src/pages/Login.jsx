import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import styles from '../CSS/Loginpage.module.css'
import { Navigate,Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth';
import { auth,provider } from '../Firebase';

import { handleGoogleSignIn } from '../hooks/Auth';
import { GoogleIcon } from '../components/Icons'
import Inputcontrol from '../components/Inputcontrol';

const Login = () => {
 /* // ? states for redux
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  //? this useEffect takes case of google sign in
  useEffect(() => {
    //! don't touch this
    /* global google 
    //? it tells react that google is globally defined in index.html
    google.accounts.id.initialize({
      // client_id: import.meta.env.VITE_GOOGLE_API,
      client_id: "360948012816-95f4ngpgh4css6q3g2avon7hljf7mcbc.apps.googleusercontent.com",
      callback: (res) => handleGoogleSignIn(res, dispatch),
    });
    //? this renders the google sign in button
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      size: 'large',
    });
  }, []);
  {
        !!user && !!Object.keys(user).length && <Navigate to='/home' />
        /* If there exist a user then redirect to Home Page 
      }
       */
  
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  // const [value,setValue] = useState('')
  const handleClick = () => {
    signInWithPopup(auth,provider).then(async(data) => {
      handleGoogleSignIn(data.user.email, dispatch)
      console.log(data.user.email)
    })
  }

  const [values, setValues] = useState({
        email: "",
        password: "",
      });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
      if(!values.email || !values.password){
        setErrorMsg("Fill all fields");
        return
      }
      setErrorMsg("")
      // console.log(values);

      setSubmitButtonDisabled(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async(res) => {
          handleGoogleSignIn(res.user.email, dispatch)
          setSubmitButtonDisabled(false);
          // navigate('/home');
          // console.log(res.user.email)
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message)})
    };



  return (
    <Container>
      {
      !!user && !!Object.keys(user).length && <Navigate to='/home' />
      /* If there exist a user then redirect to Home Page */
    } 
      <InnerContainer>
        <LeftSection>
          <Heading>ASR Post Editor Tool</Heading>
          <SubHeading>
            Upload the Video or Audio file & get the Transcript and Translation.
          </SubHeading>
        </LeftSection>
        <RightSection>
          <Heading>Sign in</Heading>
          {/* <GoogleButton id='signInDiv'>
          <button onClick={handleClick}>Sign In with Google</button> 
          </GoogleButton> */}
          {/* <Input label="Hello" /> */}
          <div>
            <Inputcontrol 
            type = "text"
            label="Email" 
            placeholder="Enter Email address" 
            onChange = {(event) =>
              setValues((prev) => ({...prev, email: event.target.value }))}
            />
            <br />
            <Inputcontrol 
            type = "password"
            label="Password" 
            placeholder="Enter Password" 
            onChange = {(event) =>
              setValues((prev) => ({...prev, password: event.target.value }))}
            />
            <br />
            <div className={styles.footer}>
              <b>{errorMsg}</b>
              <button onClick={handleSubmit} disabled={submitButtonDisabled}>Login</button>
              <p>
                Don't have an account ?{" "}
                <span>
                  <Link to ="/signup">Sign Up</Link>
                </span>
              </p>
            </div>
         </div>
         <GoogleButton onClick={handleClick} >
          <GoogleIcon />
          &nbsp;&nbsp;&nbsp;&nbsp;Sign In with Google
          </GoogleButton>
        </RightSection>
      </InnerContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
  user-select: none;
`;

const InnerContainer = styled.div`
  min-height: 70vh;
  // max-width: 1350px;
  max-width: 99%;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  display: grid;
  background-color: var(--white-color);
  @media (max-width: 800px) {
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    grid-template-columns: 10fr 6fr;
  }
`;

const LeftSection = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  color: var(--main-color);
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
`;

const RightSection = styled.section`
  height: max-content;
  width: 77%;
  background-color: white;
  position: relative;
  border: 1.5px solid black;
  border-radius: 10px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
  @media (max-width: 800px) {
    width: 90%;
    display: flex;
    align-self: center;
    justify-self: center;
  }
`;

const GoogleButton = styled.div`
  border-radius: 5px;
  transition: 0.2s;
  border: 1px solid black;
  margin-top: 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: bold;
  padding: 8px 16px;
  /* &::after {
    z-index: 0;
    width: 100%;
    content: 'Sign In With Google';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    width: max-content;
  }
  &:hover,
  &:focus {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
  & > div,
  & > div > div,
  & > div > div > iframe {
    width: 100% !important;
  }
  & > div > div > iframe {
    visibility: hidden !important;
    margin: 0 !important;
  }
  & > div > iframe {
    visibility: hidden !important;
    margin: 0 !important;
  }

  & > div {
    z-index: 1;
  } */
`;

//? this is code for Email and Password Login components
/*  
  <InputWrapper>
    <InputField type='text' required='required' />
    <InputLabel>Email</InputLabel>
    <i></i>
  </InputWrapper>
  <InputWrapper>
    <InputField type='password' required='required' />
    <InputLabel>Password</InputLabel>
    <i></i>
  </InputWrapper>
  <LinksWrapper>
    <ForgetPassword>Forget Password</ForgetPassword>
    <CreateAccount>Create Account</CreateAccount>
  </LinksWrapper>
  <SubmitButton>Sign in</SubmitButton> 



const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 35px;
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
  padding: 20px 10px 10px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--container-bg-color);
  font-size: 1rem;
  letter-spacing: 0.1rem;
  z-index: 6;

  &:valid ~ span,
  &:focus ~ span {
    color: var(--main-color);
    transform: translateY(-34px);
    font-size: 0.9rem;
  }
  &:valid ~ i,
  &:focus ~ i {
    height: 44px;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  font-size: 1rem;
  color: var(--label-color);
  pointer-events: none;
  letter-spacing: 0.1rem;
  transition: 0.5s;
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForgetPassword = styled.a`
  margin: 10px 0;
  font-size: 1rem;
  color: var(--doc-font-color);
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid transparent;
  &:hover {
    color: var(--main-color);
    border-bottom: 1px solid var(--main-color);
  }
`;

const CreateAccount = styled.a`
  margin: 10px 0;
  font-size: 1rem;
  color: var(--main-color);
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: 0.2s;
  &:hover {
    border-bottom: 1px solid var(--main-color);
  }
`;

const SubmitButton = styled.button`
  border: none;
  outline: none;
  background: var(--main-color);
  color: var(--doc-bg-color);
  padding: 11px 25px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`; 
*/

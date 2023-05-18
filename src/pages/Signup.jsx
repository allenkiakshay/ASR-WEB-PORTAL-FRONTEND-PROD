import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../CSS/Signuppage.module.css'
import Inputcontrol from '../components/Inputcontrol'
import {Link, useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase'
import { handleGoogleSignIn } from '../hooks/Auth';

function Signup() {

  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmit = () => {
      if(!values.name || !values.email || !(values.password === values.password2)){
        setErrorMsg("Fill all fields Correctly");
        return
      }
      setErrorMsg("")
      console.log(values);

      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async(res) => {
          handleGoogleSignIn(res.user.email, dispatch)
          setSubmitButtonDisabled(false);
          const user = res.user;
          updateProfile(user,{
            displayName: values.name,
          });
          navigate('/home');
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message)})
    };

  return (
    <div className={styles.container}>
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>Sign Up</h1>
            <Inputcontrol 
            type= "text"
            label="Name" 
            placeholder="Enter your Name" 
            onChange = {(event) => 
                setValues((prev) => ({...prev, name: event.target.value}))
            }
            />
            <Inputcontrol 
            type = "email"
            label="Email" 
            placeholder="Enter Email address" 
            onChange = {(event) => 
                setValues((prev) => ({...prev, email: event.target.value}))
            }
            />
            <Inputcontrol 
            type = "password"
            label="Password" 
            placeholder="Enter Password" 
            onChange = {(event) => 
               setValues((prev) => ({...prev, password: event.target.value}))
            }
            />
            <Inputcontrol 
            type ="password"
            label="ReEnter Password" 
            placeholder="Renter Enter Password" 
            onChange = {(event) => 
               setValues((prev) => ({...prev, password2: event.target.value}))
            }
            />
            
            <b>{errorMsg}</b>
            <div className={styles.footer}>
                <button onClick={handleSubmit} disabled={submitButtonDisabled}>Sign Up</button>
                <p>
                    Already have an account ?{" "}
                    <span>
                        <Link to ="/">Login</Link>
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Signup

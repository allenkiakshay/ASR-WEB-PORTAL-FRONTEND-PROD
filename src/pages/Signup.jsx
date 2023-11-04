import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../CSS/Signuppage.module.css'
import Inputcontrol from '../components/Inputcontrol'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { addUser } from '../redux/slice/userSlice';

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
    const [message, setMessage] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!values.name || !values.email || !(values.password === values.password2)){
        setErrorMsg("Fill all fields Correctly");
        return
      }
      setErrorMsg("")
      console.log(values);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, values);
        setMessage(response.data.message);
        console.log(response)
        dispatch(addUser({user:values.email}))
        navigate('/home')
      } catch (error) {
        setMessage('Error signing up');
      }

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
            <b>{message}</b>
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

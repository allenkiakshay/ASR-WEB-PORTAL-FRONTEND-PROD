import React from 'react'
import styles from '../CSS/Inputcontrol.module.css'

function Inputcontrol(props) {
  return (
    <div className={styles.container}>
        {props.label && <label>{props.label}</label>}
        <input {...props} className='styles.input'/>
      </div>
  )
}

export default Inputcontrol
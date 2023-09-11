import { useState } from 'react'
import '../styles/information.css'
import personSvg from  '../assets/person.svg'
import expandMore from '../assets/expand_more.svg'
import expandLess from '../assets/expand_less.svg'


function General({ isActive, onExpand, personalInfo, onSubmit }) {

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(personalInfo.name);
  const [email, setEmail] = useState(personalInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(personalInfo.phoneNum);

  const validateSubmit = () => {

    const inputValues = [name, email, phoneNumber];
    inputValues.forEach(input => {
      if (input === '') {
        input.setCustomValidity('Please enter a value');
        return;
      }
    });
    
    const newPersonal = {name: name, email: email, phoneNum: phoneNumber};
    onSubmit(newPersonal);
    setEditing(false);
  }

  const retrieveInfo = () => {
    setName(personalInfo.name);
    setEmail(personalInfo.email);
    setPhoneNumber(personalInfo.phoneNum);
  }

  return (
    <div className='infoForm'>
      <button className='displayForm' onClick={onExpand}>
        <img src={personSvg} alt="" />
        <h2>General Information</h2>
        <img className='expand' src={isActive ? expandLess : expandMore} alt="" />
      </button>
      { isActive ? (
        <form onSubmit={(e) => {e.preventDefault(); validateSubmit()}}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder='Full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editing}
            required />
          <label htmlFor="e-mail">E-mail</label>
          <input 
            type="email"
            id="e-mail"
            placeholder='example@123.com'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={!editing} 
            required />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            placeholder='Phone number' 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            disabled={!editing} 
            required />
          <span className='formButtons'>
            <button type='button' className={`cancelBtn${editing ? '' : ' hidden'}`} onClick={() => {setEditing(false); retrieveInfo()}}>Cancel</button>
            <button type='submit' className={`applyBtn${editing ? '' : ' hidden'}`}>Apply Changes</button>
            <button type='button' className={`editBtn${editing ? ' hidden' : ''}`} onClick={() => setEditing(true)}>Edit</button>
          </span>
        </form>
      ) : null}
    </div>
  )
}

export default General;

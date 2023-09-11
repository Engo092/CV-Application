import { useState } from 'react'
import '../styles/information.css'
import schoolSvg from '../assets/school.svg'
import expandMore from '../assets/expand_more.svg'
import expandLess from '../assets/expand_less.svg'
import add from '../assets/add.svg'
import trash from '../assets/delete.svg'
import { v4 as uuid} from 'uuid'


function Education({ isActive, onExpand, educationList, onSubmit, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [oldInfoKey, setOldInfoKey] = useState(false);
  const [name, setName] = useState();
  const [degree, setDegree] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [address, setAddress] = useState();

  const validateSubmit = () => {
    const inputValues = [name, degree, startDate, endDate];
    inputValues.forEach(input => {
      if (input === '') {
        input.setCustomValidity('Please enter a value');
        return;
      }
    });
    if (oldInfoKey !== false) {
      const editedObj = {
        key: oldInfoKey,
        schoolName: name,
        degree: degree,
        startDate: startDate,
        endDate: endDate,
        address: address
      }
      onEdit(editedObj);
    } else {
      const newEduObj = {
        key: uuid(),
        schoolName: name,
        degree: degree,
        startDate: startDate,
        endDate: endDate,
        address: address
      }
      onSubmit(newEduObj);
    }
    
    setName('');
    setDegree('');
    setStartDate('');
    setEndDate('');
    setAddress('');
    setOldInfoKey(false);
    setEditing(false);
  }

  const editInfo = (school) => {
    setOldInfoKey(school.key);
    setName(school.schoolName);
    setDegree(school.degree);
    setStartDate(school.startDate);
    setEndDate(school.endDate);
    setAddress(school.address);
  }

  return (
    <div className='infoForm'>
      <button className='displayForm' onClick={onExpand}>
        <img src={schoolSvg} alt="" />
        <h2>Educational Experience</h2>
        <img className='expand' src={isActive ? expandLess : expandMore} alt="" />
      </button>
      { isActive ? (
        <>
          {editing ? (
            <form onSubmit={(e) => {e.preventDefault(); validateSubmit()}}>
              <label htmlFor="schoolName">School Name</label>
              <input
                type="text"
                id="schoolName"
                placeholder='Enter school / university'
                disabled={!editing} 
                value = {name}
                onChange={(e) => {setName(e.target.value)}}
                required />
              <label htmlFor="titleOfStudy">Degree</label>
              <input
                type="text"
                id="titleOfStudy"
                placeholder='Enter degree / field of study'
                disabled={!editing}
                value = {degree}
                onChange={(e) => setDegree(e.target.value)}
                required />
              <label htmlFor="startDate">Start Date</label>
              <input
                type="tel"
                id="startDate"
                placeholder='Start Date'
                disabled={!editing}
                value = {startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required />
              <label htmlFor="endDate">End Date</label>
              <input
                type="tel"
                id="endDate"
                placeholder='End Date'
                disabled={!editing}
                value = {endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required />
              <label htmlFor="Schooladdress">Address (optional)</label>
              <input
                type="text"
                id="address"
                placeholder='City, state, country'
                disabled={!editing}
                value = {address}
                onChange={(e) => setAddress(e.target.value)} />
              <span className='formButtons'>
                <button type='button' className={`cancelBtn${editing ? '' : ' hidden'}`} onClick={() => {setEditing(false); setOldInfoKey(false)}}>Cancel</button>
                <button type='submit' className={`applyBtn${editing ? '' : ' hidden'}`}>Apply Changes</button>
              </span>
            </form>
          ) : (
            <>
              {educationList ? (
                educationList.map((school) => {
                  return (
                  <span className='dataPreview' key={school.key}>
                    <button className='preview' onClick={() => {setEditing(true); editInfo(school)}}>{school.schoolName}</button>
                    <button className='delete' onClick={() => onDelete(school.key)}><img src={trash} alt="delete" /></button>
                  </span>
                  )})
              ) : null}
              <button className='addNew' onClick={() => {setEditing(true)}}><img src={add} alt="" />Add new Educational Experience</button>
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default Education;

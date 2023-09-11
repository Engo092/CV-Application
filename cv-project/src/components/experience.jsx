import { useState } from 'react'
import '../styles/information.css'
import workSvg from  '../assets/work.svg'
import expandMore from '../assets/expand_more.svg'
import expandLess from '../assets/expand_less.svg'
import add from '../assets/add.svg'
import trash from '../assets/delete.svg'
import { v4 as uuid} from 'uuid'


function Experience({ isActive, onExpand, jobList, onSubmit, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [oldInfoKey, setOldInfoKey] = useState(false);
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [address, setAddress] = useState();

  const validateSubmit = () => {
    const inputValues = [name, title, startDate, endDate];
    inputValues.forEach(input => {
      if (input === '') {
        input.setCustomValidity('Please enter a value');
        return;
      }
    });
    if (oldInfoKey !== false) {
      const editedObj = {
        key: oldInfoKey,
        jobName: name,
        jobTitle: title,
        responsibilities: responsibilities,
        startDate: startDate,
        endDate: endDate,
        address: address
      }
      onEdit(editedObj);
    } else {
      const newEduObj = {
        key: uuid(),
        jobName: name,
        jobTitle: title,
        responsibilities: responsibilities,
        startDate: startDate,
        endDate: endDate,
        address: address
      }
      onSubmit(newEduObj);
    }
    
    setName('');
    setTitle('');
    setResponsibilities('');
    setStartDate('');
    setEndDate('');
    setAddress('');
    setOldInfoKey(false);
    setEditing(false);
  }

  const editInfo = (job) => {
    setOldInfoKey(job.key);
    setName(job.jobName);
    setTitle(job.jobTitle);
    setResponsibilities(job.responsibilities);
    setStartDate(job.startDate);
    setEndDate(job.endDate);
    setAddress(job.address);
  }

  return (
    <div className='infoForm'>
      <button className='displayForm' onClick={onExpand}>
        <img src={workSvg} alt="" />
        <h2>Job Experience</h2>
        <img className='expand' src={isActive ? expandLess : expandMore} alt="" />
      </button>
      { isActive ? (
        <>
        {editing ? (
          <form onSubmit={(e) => {e.preventDefault(); validateSubmit()}}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text" 
              id="companyName" 
              placeholder='Enter company name' 
              disabled={!editing} 
              value = {name}
              onChange={(e) => {setName(e.target.value)}}
              required />
            <label htmlFor="positionTitle">Position Title</label>
            <input 
              type="text" 
              id="positionTitle" 
              placeholder='Enter position title' 
              disabled={!editing} 
              value = {title}
              onChange={(e) => {setTitle(e.target.value)}}
              required />
            <label htmlFor="responsibilities">Responsibilities (optional)</label>
            <textarea 
              id="responsibilities"
              placeholder='Description of your job' 
              value = {responsibilities}
              onChange={(e) => {setResponsibilities(e.target.value)}}
              disabled={!editing} />
            <label htmlFor="jobStartDate">Start Date</label>
            <input 
              type="tel" 
              id="jobStartDate" 
              placeholder='Start Date' 
              disabled={!editing} 
              value = {startDate}
              onChange={(e) => {setStartDate(e.target.value)}}
              required />
            <label htmlFor="jobEndDate">End Date</label>
            <input 
              type="tel" id="jobEndDate" 
              placeholder='End Date' 
              disabled={!editing}
              value = {endDate}
              onChange={(e) => {setEndDate(e.target.value)}}
              required />
            <label htmlFor="address">Address (optional)</label>
            <input 
              type="text" 
              id="address" 
              placeholder='City, state, country' 
              disabled={!editing}
              value = {address}
              onChange={(e) => {setAddress(e.target.value)}} />
            <span className='formButtons'>
              <button type='button' className={`cancelBtn${editing ? '' : ' hidden'}`} onClick={() => {setEditing(false); setOldInfoKey(false)}}>Cancel</button>
              <button type='submit' className={`applyBtn${editing ? '' : ' hidden'}`}>Apply Changes</button>
            </span>
          </form>
          ) : (
            <>
              {jobList ? (
                jobList.map((job) => {
                  return (
                  <span className='dataPreview' key={job.key}>
                    <button className='preview' onClick={() => {setEditing(true); editInfo(job)}}>{job.jobName}</button>
                    <button className='delete' onClick={() => onDelete(job.key)}><img src={trash} alt="delete" /></button>
                  </span>
                  )})
              ) : null}
              <button className='addNew' onClick={() => {setEditing(true)}}><img src={add} alt="" />Add new Job Experience</button>
            </>
          )}
      </>
      ) : null}
    </div>
  )
}

export default Experience;

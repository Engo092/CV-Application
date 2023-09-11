import { useState } from 'react'
import '../styles/curriculum.css'
import mailIcon from '../assets/mail.svg'
import phoneIcon from '../assets/phone.svg'

function Curriculum({ personalInfo, educationInfo, jobInfo }) {
    
    return (
      <section className='curriculumDisplay'>
        <section className='personalInfo'>
          <p className='name'><b>{personalInfo.name}</b></p>
          <span className='contacts'>
            <p className='email'><img src={mailIcon} alt="" />{personalInfo.email}</p>
            <p className='phoneNumber'><img src={phoneIcon} alt="" />{personalInfo.phoneNum}</p>
          </span>
        </section>
        {educationInfo ? (
          <section className='educationInfo'>
            <span className='sectionTitle'><b>Education</b></span>
            {educationInfo.map((edu) => {
              return (
              <div className='educationExperience' key={edu.key}>
                <span className='dateAndAddress'>
                  <p className='date'>{edu.startDate} - {edu.endDate}</p>
                  <p className='address'>{edu.address}</p>
                </span>
                <span className='nameAndDegree'>
                  <p className='schoolName'><b>{edu.schoolName}</b></p>
                  <p className='degree'>{edu.degree}</p>
                </span>
              </div>
            )})}
          </section>
        ) : null}
        
        {jobInfo ? (
          <section className='jobInfo'>
            <span className='sectionTitle'><b>Work Experience</b></span>
            {jobInfo.map((job) => {
              return (
                <div className='jobExperience' key={job.key}>
                  <span className='dateAndAddress'>
                    <p className='date'>{job.startDate} - {job.endDate}</p>
                    <p className='address'>{job.address}</p>
                  </span>
                  <span className='nameAndDesc'>
                    <p className='companyName'><b>{job.jobName}</b></p>
                    <p className='posTitle'>{job.jobTitle}</p>
                    <p className='jobDesc'>{job.responsibilities}</p>
                  </span>
                </div>
              )})}
          </section>
        ) : null}
      </section>
    )
  }
  
  export default Curriculum;
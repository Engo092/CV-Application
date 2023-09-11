import { useState } from 'react'
import General from './general.jsx'
import Education from './education.jsx'
import Experience from './experience.jsx'
import Curriculum from './curriculum.jsx'
import { v4 as uuid} from 'uuid'

function App() {
    const [shownIndex, setShownIndex] = useState(0);
    const [personal, setPersonal] = useState({name: 'John Doe', email: 'example@123.com', phoneNum: '12345-6789'});
    const [schools, setSchools] = useState([{key: uuid(), schoolName: 'Test University', degree: 'Computer Science', startDate: '01/01/2020', endDate: '01/12/2023', address: 'California, US'}]);
    const [jobs, setJobs] = useState([{key: uuid(), jobName: "The tech'er company", jobTitle: "Front-end junior", responsibilities: "Just a simple test!", startDate: '01/01/2020', endDate: '01/12/2023', address: 'California, US'}]);
  
    return (
        <>
            <section>
                <General
                    isActive={shownIndex === 0}
                    onExpand={() => (shownIndex === 0) ? setShownIndex(-1) : setShownIndex(0)}
                    personalInfo={personal}
                    onSubmit={(newPersonal) => setPersonal(newPersonal)}
                />
                <Education
                    isActive={shownIndex === 1}
                    onExpand={() => (shownIndex === 1) ? setShownIndex(-1) : setShownIndex(1)}
                    educationList={schools}
                    onSubmit={(newEducation) => {
                        const newEduState = [...schools, newEducation];
                        setSchools(newEduState);
                    }}
                    onDelete={(deletedObjKey) => {
                        const newEduState = schools.filter((school) => school.key !== deletedObjKey);
                        setSchools(newEduState);
                    }}
                    onEdit={(editedObj) => {
                        const newState = schools.map(school => {
                            if (school.key === editedObj.key) {
                                return editedObj;
                            } else {
                                return school;
                            }
                        })
                        setSchools(newState);
                    }}
                />
                <Experience
                    isActive={shownIndex === 2}
                    onExpand={() => (shownIndex === 2) ? setShownIndex(-1) : setShownIndex(2)}
                    jobList={jobs}
                    onSubmit={(newWork) => {
                        const newJobState = [...jobs, newWork];
                        setJobs(newJobState);
                    }}
                    onDelete={(deletedObjKey) => {
                        const newJobState = jobs.filter((job) => job.key !== deletedObjKey);
                        setJobs(newJobState);
                    }}
                    onEdit={(editedObj) => {
                        const newState = jobs.map(job => {
                            if (job.key === editedObj.key) {
                                return editedObj;
                            } else {
                                return job;
                            }
                        })
                        setJobs(newState);
                    }}
                />
            </section>
            <Curriculum 
                personalInfo={personal}
                educationInfo={schools.length > 0 ? schools : null}
                jobInfo={jobs.length > 0 ? jobs : null}
            />
        </>
    )
  }
  
  export default App;
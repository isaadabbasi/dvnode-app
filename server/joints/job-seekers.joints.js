const
    JobSeeker = require('../models/job-seeker.model');

class JobSeekerJoint {
    constructor(){
        console.log(`JOB SEEKER JOINT INVOKED @${Date.now()}`);
    }

    checkIfUserExists(email){
        const responseParams= {
                __v: false,
                created: false,
                fullname: false
            };

        return new Promise((resolve, reject) => {
            JobSeeker.findOne({"personal_info.email": email}, responseParams)
                .then(body=>{
                    console.log('body: ', body)
                    '_id' in body ? 
                        resolve({status: 200, body })
                        :
                        resolve({status: 404, body: 'NOT_FOUND'})
                 })
                .catch(err => { reject (err) })
        });
    }

    saveJobSeeker(jobSeekerModel){
        const jobSeeker = new JobSeeker({
            personal_info: jobSeekerModel,
            professional_details: {},
            jobs: [],
            education: {}
        });
        return new Promise((resolve, reject) => {
            let saveJobSeeker = err=> {
                console.log(err);
                err ?
                    reject({status: 409, body: "Account Already Exists"})
                    :
                    resolve({status:201, body: "Account Created Successfully"});
            }
            jobSeeker.save(saveJobSeeker);
        });
    }

}

module.exports = new JobSeekerJoint();
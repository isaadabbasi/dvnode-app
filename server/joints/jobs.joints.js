const 
    Jobs = require('../models/jobs.model'),
    // Jobs = require('mongoose').model('jobs'),
    { commonCallback } = require('../utils/common.utils');

class JobsJoint {

    constructor(){
        console.log(`JOINT TO JOBS MADE...`);
    }

    find(query = {}, projection = {}){
        console.log('query => ', query);
        return new Promise((resolve, reject) => {
            Jobs.find(query, projection, commonCallback(resolve, reject))
        });
    }

    findById(id){
        console.log(`querying jobs for ${id} ID`);
        return new Promise((resolve, reject) => {
            Jobs.findById(id, commonCallback(resolve, reject)) 
        });
    }

    deleteById(id) {
        console.log(`delete call for job_id: ${id}`);
        return new Promise((resolve, reject) => {
           Jobs.findByIdAndRemove(id, commonCallback(resolve, reject, {successmsg: 'Job Deleted'}));
        });
    }

    save(jobModel){
        const newJob = new Jobs(jobModel);
        let options = {
            successmsg: 'Job Added',
            errmsg: "Unable to save job",
        }
        return new Promise((resolve, reject) => {
            newJob.save(commonCallback(resolve, reject, options))
        });
    }

}

module.exports = new JobsJoint();
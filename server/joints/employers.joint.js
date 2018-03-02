const 
    Employers = require('../models/employers.model'),
    { commonCallback } = require('../utils/common.utils');

class EmployersJoint {
    constructor(){}

    save({email, password, contact, fullname, job_title}) {
        const 
            employer = new Employers({
                personal_info: {email, password, contact, fullname},
                bussiness_info: {name: job_title}
            }),
            options = { 
                errmsg: "Unable to register employer", 
                successmsg: "Employer Registered"
            }
        return new Promise((resolve, reject) => {
            employer.save(commonCallback(resolve, reject, options))
        });
    }

    findByEmail(email){
        return new Promise((resolve, reject) => {
            Employers.findOne({"personal_info.email": email}, commonCallback(resolve, reject));
        });
    }
    findByParams(params){
        return new Promise((resolve, reject) => {
            Employers.findOne(params, commonCallback(resolve, reject))
        });
    }

    findById(id){
        return new Promise((resolve, reject) => {
            Employers.findById(id, commonCallback(resolve, reject));
        });
    }
}
module.exports = new EmployersJoint();
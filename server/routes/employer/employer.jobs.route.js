const 
    express = require('express'),
    router = express.Router(),
    JobJoint = require('../../joints/jobs.joints'),
    // {operation} = require('../jobs.route'),
    addJob = async (request, response) => {
        let {
            title = null, category = null, additional_info = '',
            contract = null, salary = null, manager_info = null,
            total_applicants = [], location = {}, invitation_link = null
        } = request.body;

        let jobModel = {
            title, category, additional_info, contract, 
            salary, manager_info, total_applicants, location, invitation_link
        }

        try {
            const {status, body} = await JobJoint.save(jobModel);
            console.log(status, body);
            response.status(status).send(body);

        } catch( e ){
            console.error(e);
        }
    }
    
    // deleteJob = async (request, response, next) => {
    //     console.log('checking redirect', request.path);
    //     // next(`/jobs/`)
    // };

router.post('/add', addJob);
// router.delete('/job_id', deleteJob);

module.exports = router;
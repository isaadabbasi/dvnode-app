const
    express = require('express'),
    router = express.Router(),
    JobsJoint = require('../joints/jobs.joints'),
    {isObjectId, checkTokenInRequest} = require('../utils/common.utils'),
    getJobsHandler = async (request, response) => {
        //TODO
        const 
            filters = request.query,
            projection = null;

            const {status, body: jobs} = await JobsJoint.find(filters, projection);
            response.status(status).send(jobs);
    }

    operation = (TYPE)=> {
        let operation;
        switch(TYPE = 'GET'){
            case 'GET': operation = 'findById'; break;
            case 'DELETE': operation = 'deleteById'; break;            
        }


        return getJobById = async (request, response)=> {
            const {job_id: jobId} = request.params;
            
            if(!isObjectId(jobId)) 
                response.status(400).send('Invalid Job Id');
            else 
                try {
                    const { status, body: job } = await JobsJoint[operation](jobId);
                    response.status(status).send(job);
                } catch( e ){
                    console.error(e);
                }
        };
    };




router.get('/', getJobsHandler);
router.route('/:job_id')
    .get(operation('GET'))
    .delete(operation('DELETE'));
    // .patch();
// router.get('/:job_id', checkTokenInRequest(), getJobById);

module.exports = router;
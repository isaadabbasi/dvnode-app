const
    express = require('express'),
    router = express.Router(),
    EmployersJoint = require('../../joints/employers.joint'),
    EmployerJobs = require('./employer.jobs.route'),
    bcrypt = require('bcrypt'),
    { commonCallback, checkTokenInRequest } = require('../../utils/common.utils'),
    { generateHash, assignStandardJWT: assignJWT } = require('../../utils/crypto.utils'),
    
    login = async (request, response) => {
        const { email = null, password = null } = request.body;
        if(!email || !password) {
            resposne.status(401).send('Invalid login parameters');
            return;
        }
        try {
            const {status, body: employer} = await EmployersJoint.findByEmail(email);
            if( status === 200 && employer ){
                const { personal_info: { password: hash = null, email, contact, fullname } } = employer;
                const compared = await bcrypt.compare(password, hash);
                if(!compared){
                    response.status(401).send('Password not matched');
                    return; 
                } 
                const token = await assignJWT({email, contact, fullname})
                response.cookie('YAPSESSION', token);
                response.status(status).send("Login Successful");
                
            } else {
                response.status(401).send("Invalid account credentials");
            }

        } catch( e ) {
            console.error(`caught error: => ${e.message}`);
        }
    },
    
    register = async (req, res, next)=> {
        let { 
            fullname = null, email = null,
            contact = null, password = null,
            job_title = null } = req.body;
            
            try{
                const {body: employer} = await EmployersJoint.findByEmail(email);
                if(employer){
                    res.status(409).send("Email already exists")
                    return;
                }
                const hash = await generateHash(password) // return hash with 10 round salt added
                const jobSeekerModel = {
                    fullname, email, contact, password: hash, job_title
                }
                const {status, body} = await EmployersJoint.save(jobSeekerModel);
                res.status(status).send(body);

            } catch( e ){
                console.error(e);
                const { status = 500, body = "Some error at registring users" } = e;
                res.status(status).send(body);
            }
    };


router.post('/login', login);
router.post('/register', register);
router.use('/jobs',EmployerJobs);

module.exports = router;
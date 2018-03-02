const 
    express = require('express'),
    router = express.Router(),
    JobSeekerJoint = require('../joints/job-seekers.joints'),
    {assignStandardJWT, generateHash} = require('../utils/crypto.utils'),

    loginHandler = (req, res, next)=> {
        // console.log('body: ',req.body);
        
        // should be handled with complete validators.
        // validator for data varification should be a util (and tested).
        // Try to apply NASA's rule of function (should not be longer than a page).

        if(req.body.email && req.body.password){
            const
                email = req.body.email.trim(), 
                password = req.body.password,
                recordFindCb = (err, record)=>{
                    if(err)
                        res.status(501).send("Error occured on login attempt");
                    if(!record)
                        res.status(401).send("No Such Account Exists")
                };
                // req.body.email ? // check if email exists on http call. 

                    JobSeekerJoint.checkIfUserExists(req.body.email) 
                        .then(record => {
                            
                            '_id' in record.body ?   
                                bcrypt.compare(password, record.body.personal_info.password)
                                    .then( passwordMatched => {
                                        if(passwordMatched) {
                                            let {email, password, _id, contact} = record.body.personal_info;
                                            // console.log(email, _id, contact);
                                            assignStandardJWT({email, _id, contact})
                                                .then(token => {
                                                    res.cookie('YAPSESSION', token) ;
                                                    res.status(202).send({token, body: record.body});
                                                }).catch(err=>{
                                                    console.log(err);
                                                })
                                        }
                                        else 
                                            res.status(401).send('Invalid Password');
                                    })
                                    .catch(err => {
                                        res.status(500).send('Error at password match');
                                    })
                                : 
                                res.status(401).send('No record for such email');
                        })
                        .catch(err=>{
                            res.status(401).send('No record for such email');
                        })
            } else {
                res.status(401).send('Email and Password Required');
            }
    },

    registrationHandler = async (req, res, next)=> {
        let 
            {fullname = null, email = null, contact = null, password = null} = req.body;
            try{
                const hash = await generateHash(password) // return hash with 10 round salt added
                const jobSeekerModel = {
                    fullname, email, contact, password: hash
                }
                const {status, body} = await JobSeekerJoint.saveJobSeeker(jobSeekerModel);
                res.status(status).send(body);

            } catch( e ){
                console.error(e);
                const { status = 500, body = "Some error at registring users" } = e;
                res.status(status).send(body);
            }
    }


router.post('/login', loginHandler);
router.post('/register', registrationHandler);
module.exports = router;
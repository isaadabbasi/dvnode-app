const 
    express = require('express'),
    router = express.Router(),
    Users = require('../joints/users.joints'),
    {assignStandardJWT, generateHash} = require('../utils/crypto.utils'),
    bcrypt = require('bcrypt'), 

    loginHandler = async (request, response) => {
        const { email = null, password = null } = request.body;
        if(!email || !password) {
            resposne.status(401).send('Invalid login parameters');
            return;
        }
        try {
            const {status, body} = await Users.findByEmail(email);
            if( status === 200 && body){
                const 
                    { _id, password: hash } = body,
                    compared = await bcrypt.compare(password, hash);
                
                if(!compared){
                    response.status(401).send('Password not matched');
                    return; 
                } 
                const token = await assignStandardJWT({uid: _id, stamp: Date.now()})
                response.cookie('USRSESSXX3', token);
                response.status(status).send("Login Successful");
                
            } else {
                response.status(401).send("Invalid account credentials");
            }

        } catch( e ) {
            console.error(`caught error: => ${e.message}`);
        }
    },

    /**
     *  @author Saad Abbasi.
     */
    registrationHandler = async (req, res, next)=> {
        let 
            reject = (status, message)=> {
                res.status(403).send(message);
                return;                
            },
            {email = null, username = null, password = null} = req.body;
            
            if(!email || !username || !password){
                reject(403, 'Please provide complete details');
            }
            
            if( ! /\w+@\w+\.\w{2,4}/i.test(email) ){
                reject(403, 'Please provide valid email');
            }

            try{
                const { body: _user } = await Users.findByEmail(email);    
                if(_user && _user._id){
                    reject(401, 'Email already exists');
                }
                const 
                    hash = await generateHash(password),
                    user = {
                        email, username, password: hash
                    },
                    {status, body}= await Users.save(user);
                    res.status(status==200 ? 201 : 500).send(body);

                } catch( e ){
                console.error(e);
                const { status = 500, body = "Some error at registring users" } = e;
                res.status(status).send(body);
            }
    }


router.post('/login', loginHandler);
router.post('/register', registrationHandler);
module.exports = router;
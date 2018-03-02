const 
    mongooseTypes = require('mongoose').Types,
    { verifyJWT } = require('./promisify.utils'),
    { verifyToken } = require('./crypto.utils');

/**
 * @Author Saad Ababsi
 * @class CommonUtils, commonUtils class for custom written or library modified methods.
 */

class CommonUtils {
    /**
     * @author Saad Abbasi
     * @param {id} could be any string
     * @returns boolean acc to if the param id is valid mongodb object id.
     */
    isObjectId(id){
        return mongooseTypes.ObjectId.isValid(id);
    }

    /**
     * @author Saad Abbasi
     * @description To be used as a middleware to check if JWT is available inside HTTP request.
     */

    checkTokenInRequest(){
        return (request, response, next)=>{
            const {USRSESSXX3: token = null} = request.cookies;
            if(token)
                verifyToken(token)
                    .then(verified =>{
                        // pass next to then in functional style.
                        next();
                    })
                    .catch(err => {
                            response.status(403).send(err.message === 'jwt expired' ? 'Token/Session Expired': 'Oops! Invalid Session');
                    })
            else 
                response.status(403).send('Unauthorized user!');
        }
    }

    /**
     * @param {resolve} resolves the promise.
     * @param {reject}  rejects the promise.
     * @param {messages?}  (optional) to override retrieved values of body.
     * @returns resolved/rejected promise object with two properties, {status, body} 
     */
    commonCallback (resolve, reject, { errmsg = null, successmsg = null }={}){
        return (err, body)=>{  
            console.log(err, body);
            err ? 
                reject({ status: 500, body: errmsg || err.message }) : 
                resolve({status: 200, body: successmsg || body });
        };
    }
}

module.exports = new CommonUtils();
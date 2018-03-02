const 
    User = require('../models/users.model'),
    {commonCallback} = require('../utils/common.utils');

/**
 * @author Saad Abbasi
 * @class {UserJoint} To handle operations directly related to User model.
 * @description {save, findByEmail, find, findById} details in comment per method
 */
class UserJoint {
    /**
     * @author Saad Abbasi
     * @param {model} object that must contain properties of user model.
     * @returns an object with two properties {status, body} wrapped in promise. 
     */
    save(model){
        let user = new User(model),
            msgs = {
                successmsg: 'User registered'
            };
        return new Promise((resolve, reject) => {
            user.save(commonCallback(resolve, reject, msgs));
        })
    }

    /**
     * @author Saad Abbasi
     * @param {email} string that must be valid email.
     * @returns an object with two properties {status, body} wrapped in promise. 
     */
    findByEmail(email){
        return new Promise((resolve, reject)=> {
            User.findOne( {email}, commonCallback(resolve, reject))
        })
    }

}
module.exports = new UserJoint();
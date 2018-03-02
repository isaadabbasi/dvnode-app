const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelName = 'users',
    
    userModel = new Schema({
        email: { type: String, minlength: 8, maxlength: 42, trim: true},
        username: { type: String, minlength: 3, maxlength: 42, trim: true},
        password: { type: String },
        created_at: { type: Schema.Types.Date, default: Date.now() },
        updated_at: { type: Schema.Types.Date, default: Date.now() }
    }),

    model = mongoose.model(modelName, userModel);


module.exports = model;
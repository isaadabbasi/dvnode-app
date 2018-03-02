const 
    mongoose = require('mongoose'),
    Schema = require('mongoose').Schema,
    // Model = require('mongoose').model,

    AccountInfo = new Schema({
        subscription_type: { type: String },
        status: { type: String },
        card_number: { type: String },
        card_type: { type: String }
    }, {_id: false}),

    BusinessInfo = new Schema({
        name: { type: String },
        address: { type: Object },
        logo: { type: String },
        cover: { type: String }
    }, {_id: false}),

    Jobs = new Schema({
        name: { type: String, trim: true },
        reference: { type: Schema.Types.ObjectId, ref: 'jobs' },
        logo: { type: String },
        cover: { type: String }
    }, {_id: false}),

    PersonalInfo = new Schema({
        fullname: { type: String, trim: true },
        contact: { type: String, trim: true },
        email: { type: String, trim: true, unique: true },
        password: { type: String }  
    }, {_id: false}),
    
    EmployersSchema = new Schema({
        account_info: AccountInfo,
        bussiness_info: BusinessInfo,
        dated: {type: Date, default: Date.now},
        invoices: Object,
        jobs: Jobs,
        personal_info: PersonalInfo
    }),
    model = mongoose.model('employers', EmployersSchema);

module.exports = model;
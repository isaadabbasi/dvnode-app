const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelName = 'jobs',
    
    salaryModel = new Schema({
        currency: { type:String, trim: true, maxlength: 20 },
        amount: { type: Number, min: 0, default: null },
        per: { type: String, trim: true, maxlength: 20}
    }, {_id: false}),
    
    managerModel = new Schema({
        reference: {type: Schema.Types.ObjectId, ref: 'employers'}, 
    }, {_id: false}),

    JobsSchema = new Schema({
        title: {type: String, required: true, maxlength: 50, trim: true },
        category: {type: String, required: true, maxlength: 50 },
        additional_info: { type: String, trim: true },
        // title: {type: String, required: true, maxlength: 50 },
        salary: salaryModel, 
        manager_info: managerModel, 
        total_applicants: [
            new mongoose.Schema({
                reference: {type: Schema.Types.ObjectId, ref: 'job_seekers'}
            },{_id: false})
        ],
        invitation_link: {type: String},
        location: { type: Object },
        contract: { type: String, trim: true },
        role: { type: String }
    });

    const model = mongoose.model(modelName, JobsSchema);


module.exports = model;
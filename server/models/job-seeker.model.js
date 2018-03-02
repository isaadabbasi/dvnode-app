const 
    mongoose = require('mongoose'),
    collection = 'job_seekers',
    Schema = mongoose.Schema,

    //PERSONAL INFO SCHEMA
    PersonalInfo = new Schema({
        fullname: { type: String, trim: true },
        contact: { type: String, trim:true },
        email: { type: String, trim: true },
        password: { type: String, required: false },
        profile_url: { type: String }, 
        profile_cover: { type: String } 
    }),

    // EXPERIENCES | PART OF PROFESSIONAL DEATAILS
    Experiences=  new Schema({
        company_name: { type:String, trim: true },
        job_title: {type: String, trim: true },
        city: { type: String },
        start_date: { type: Date, default: Date.now },
        end_date: { type: Date },
        action: { type: String } // will se what is it;
    }),

    // JOBS | PART OF JOBS SCHEMA.
    Jobs = new Schema({
        created: {type: Date, default: Date.now },
        reference: { type: Schema.Types.ObjectId, ref: 'jobs' }
    }, {_id: false}),

    Education = new Schema({
        level: {type: String, trim: true },
        status: { type: String }
    }, {_id: false}),

    // PROFESSIONAL DETAILS | PART OF JOB SEEKER SCHEMA
    ProfessionalDetails = new Schema({
        skills: [String],
        preffered_category: {type: String, trim: true},
        experiences: [Experiences]
    }),

    //JOB SEEKER SCHEMA
    JobSeeker = new Schema({
        personal_info: PersonalInfo,
        professional_details: ProfessionalDetails,
        jobs: [Jobs],
        education: Education,
        location: Object,
        created: {type: Date, default: Date.now }
    }, {collection}),

    model = mongoose.model('job_seekers', JobSeeker);

module.exports = model;
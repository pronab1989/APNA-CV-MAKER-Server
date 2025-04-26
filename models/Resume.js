const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  phones: [{ type: String }],
  emails: [{ type: String }],
  summary: { type: String },
  educationList: [{
    school: { type: String },
    degree: { type: String },
    passingYear: { type: String }
  }],
  experienceList: [{
    company: { type: String },
    role: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    responsibilities: { type: String }
  }],
  currentJob: {
    company: { type: String },
    role: { type: String },
    startDate: { type: Date },
    isWorking: { type: Boolean, default: true }
  },
  technicalSkills: [{
    value: { type: String },
    label: { type: String }
  }],
  nonTechnicalSkills: [{
    value: { type: String },
    label: { type: String }
  }],
  projects: [{
    title: { type: String },
    technologies: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }
  }],
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
    twitter: { type: String },
    medium: { type: String }
  },
  hobbies: [{
    value: { type: String },
    label: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);

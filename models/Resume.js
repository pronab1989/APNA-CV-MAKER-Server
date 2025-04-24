const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  dob: Date,
  phones: [String],
  emails: [String],
  educationList: [
    {
      school: String,
      degree: String,
      passingYear: Number,
    },
  ],
  experienceList: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      responsibilities: String,
    },
  ],
  currentJob: {
    company: String,
    role: String,
    startDate: Date,
    isWorking: Boolean,
  },
  technicalSkills: [
    {
      value: String,
      label: String,
    },
  ],
  nonTechnicalSkills: [
    {
      value: String,
      label: String,
    },
  ],
  projects: [
    {
      title: String,
      technologies: String,
      description: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  socialLinks: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String,
    medium: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Resume', ResumeSchema);

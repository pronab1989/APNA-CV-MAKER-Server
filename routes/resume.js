const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// @route   POST /api/resume
// @desc    Save resume data
router.post('/', async (req, res) => {
  try {
    const resumeData = req.body;
    console.log('📥 Received resume data:', resumeData);

    // Validate required fields
    if (!resumeData.firstName || !resumeData.lastName || !resumeData.dob) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new resume document
    const newResume = new Resume(resumeData);
    
    // Save to database
    const savedResume = await newResume.save();
    console.log('✅ Resume saved to DB:', savedResume._id);

    res.status(200).json({ 
      message: 'Resume saved successfully',
      resumeId: savedResume._id
    });
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
});

// @route   GET /api/resume/:id
// @desc    Get resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Resume = require('../models/Resume'); // Mongoose model

// router.post('/resume', async (req, res) => {
//   try {
//     const resume = new Resume(req.body);
//     await resume.save();
//     res.status(201).json({ message: 'Resume saved successfully!' });
//   } catch (error) {
//     console.error('Error saving resume:', error);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// });

// module.exports = router;




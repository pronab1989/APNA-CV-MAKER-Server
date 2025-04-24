// const express = require('express');
// const router = express.Router();
// const Resume = require('../models/Resume');

// // @route   POST /api/resume
// // @desc    Save resume data
// router.post('/', async (req, res) => {
//   try {
//     const resumeData = req.body;
//     console.log('Received resume:', resumeData);

//     // Optionally save to database here...

//     res.status(200).json({ message: 'Resume saved successfully' });
//   } catch (error) {
//     console.error('Error saving resume:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// @route   POST /api/resume
// @desc    Save resume data
router.post('/', async (req, res) => {
  try {
    const resumeData = req.body;
    console.log('📥 Received resume:', resumeData);

    const newResume = new Resume(resumeData);
    await newResume.save(); // ✅ Save to MongoDB

    console.log('✅ Resume saved to DB');
    res.status(200).json({ message: 'Resume saved successfully' });
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


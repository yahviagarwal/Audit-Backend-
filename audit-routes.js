const express = require('express');
const router = express.Router();

// Hardcoded audit questionnaire (array of questions)
const AUDIT_QUESTIONS = [
  { id: 'q1', question: 'Were there any noticeable streaks or smudges before the cleaning?' },
  { id: 'q2', question: 'Does the glass look brighter and more transparent now?' },
  { id: 'q3', question: 'Does the glass appear to be free of dust and fingerprints?' },
  { id: 'q4', question: 'Did the cleaner reach all of the corners and edges of the glass?' },
  { id: 'q5', question: 'Can you see through the glass without any distortions?' }
];

// Data object to store audit results mapped against request IDs
const AUDIT_RESULTS = {};

// GET API to fetch the audit questionnaire
router.get('/getAuditDetails', (req, res, next) => {
  res.json({ auditQuestions: AUDIT_QUESTIONS });
});

// POST API to save audit answers against a request ID
router.post('/saveAuditResults', (req, res, next) => {
  const { requestId, answers } = req.body;

  // Validate input
  if (!requestId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  // Save the answers against the requestId
  AUDIT_RESULTS[requestId] = answers;

  res.status(200).json({ message: 'Audit results saved successfully' });
});

// GET API to fetch audit results by request ID
router.get('/getAuditResults/:requestId', (req, res, next) => {
  const requestId = req.params.requestId;

  const results = AUDIT_RESULTS[requestId];

  if (!results) {
    return res.status(404).json({ message: 'No audit results found for this request ID' });
  }

  res.json({ requestId, results });
});

module.exports = router;

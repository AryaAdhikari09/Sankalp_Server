const express = require("express")
const router = express.Router()

const { createResult, getAllResults } = require("../controllers/ResultController")

router.get('/', getAllResults) // gets all results
router.post('/create', createResult) // creates a result

module.exports = router
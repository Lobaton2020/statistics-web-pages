const express = require('express')
const saveOrUpdateRecords = require('./usecases/saveOrUpdateRecords')
const getRecords = require('./usecases/getRecords')
const getAllRecords = require('./usecases/getAllRecords')
const router = express.Router()

router.post('/tracking/:id',saveOrUpdateRecords)
router.get('/tracking/:id',getRecords)
router.get('/tracking',getAllRecords)
module.exports = router
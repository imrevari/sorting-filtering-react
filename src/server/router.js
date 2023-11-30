const express = require('express')
const app = express()

const data = require('./data.json') 
const router = express.Router()

let localData = [...data]




router.get('/', (req, res) => {
    res.send(localData)
})

router.post('/', (req, res) => {
    let newData = req.body
    const latData = localData[localData.length - 1]
    newData.id = parseInt(latData.id) + 1
    localData = [...localData, newData]
    res.send(localData)
})

router.put('/:id', (req, res) => {
    const paramId = req.params.id;
    let updatedData = req.body
    const dataToUpdate = localData.find( ({id}) => id == paramId)
    updatedData = {...updatedData, id: parseInt(dataToUpdate.id)}
    const index = localData.indexOf(dataToUpdate);
    localData[index] = updatedData
    res.send(localData)
})

router.delete('/:id', (req, res) => {
    const paramId = req.params.id;
    const dataToDelete = localData.find( ({id}) => id == paramId)
    const index = localData.indexOf(dataToDelete);
    if (index !== -1) {
        localData.splice(index, 1);
    }
    res.send(localData)
})

module.exports = router
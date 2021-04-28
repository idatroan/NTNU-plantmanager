const router = require('express').Router();
const { checkIfManager } = require('../middlewares/checkIfManager');
const {
    createPlant,
    updatePlantById,
    deletePlantById,
    waterPlantById
} = require('../controllers/plantController');

router.post('/', checkIfManager, createPlant);

router.put('/:id', checkIfManager, updatePlantById);

router.put('/water/:id', checkIfManager, waterPlantById);

router.delete('/:id', checkIfManager, deletePlantById);

module.exports = router;
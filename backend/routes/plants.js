const router = require('express').Router();
const { checkIfManager } = require('../middlewares/checkIfManager');

const {
    createPlant,
    getPlantById,
    getAllPlants,
    updatePlantById,
    deletePlantById
} = require('../controllers/plantController');

// router.post('/', checkIfManager, createPlant);
router.post('/', createPlant);

router.get('/', getAllPlants);

router.get('/:id', getPlantById);

router.put('/:id', checkIfManager, updatePlantById);

router.delete('/:id', checkIfManager, deletePlantById);

module.exports = router;
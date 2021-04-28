const router = require('express').Router();
const { checkIfManager } = require('../middlewares/checkIfManager');

const {
    /*createPlant,
    updatePlantById,
    deletePlantById,
    waterPlantById,*/
    createPlant,
    getPlantById,
    getAllPlants
} = require('../controllers/plantController');

// router.post('/', checkIfManager, createPlant);
router.post('/', createPlant);

router.get('/', getAllPlants);

router.get('/:id', getPlantById);

/*router.post('/', checkIfManager, createPlant);

router.put('/:id', checkIfManager, updatePlantById);

router.put('/water/:id', checkIfManager, waterPlantById);

router.delete('/:id', checkIfManager, deletePlantById);*/

module.exports = router;
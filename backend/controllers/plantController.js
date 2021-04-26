const Plant = require('../models/plant');
const upload = require('../lib/uploadImage');

const createPlant = async (req, res) => {
    const { name, location, waterFrequency, fertilizingFrequency, light } = req.body;

    const newPlant = new Plant({
        name: name,
        location: location,
        plantNeeds: {
            waterFrequency: waterFrequency,
            fertilizingFrequency: fertilizingFrequency,
            light: light
        }
    });

    try {

        /*upload(req, res, (err) => {
            if (err) {
              res.sendStatus(500);
            }
            res.send(req.file);
          });*/

        newPlant.save();
        res.status(200).json(newPlant);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getPlantById = async (req, res) => {
    const plantToFind = await Plant.findById(req.params.id);

    try {
        res.status(200).send(plantToFind);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getAllPlants = async (req, res) => {
    const plants = await Plant.find();

    try {
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const updatePlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        const { name, location, waterFrequency, fertilizingFrequency, light } = req.body;

        if (name) plant.name = name;
        if (location) plant.location = location;
        if (waterFrequency) plant.plantNeeds.waterFrequency = waterFrequency;
        if (fertilizingFrequency) plant.plantNeeds.fertilizingFrequency = fertilizingFrequency;
        if (light) plant.plantNeeds.light = light;

        await plant.save();
        res.status(200).json(`${plant.name} have been updated!`);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deletePlantById = async (req, res) => {
    const plant = await Plant.findById(req.params.id);

    try {
        plant.remove();
        res.status(200).json({ message: `${plant.name} have been deleted`});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    createPlant,
    getPlantById,
    getAllPlants,
    updatePlantById,
    deletePlantById
}
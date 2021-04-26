const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    plantNeeds: {
        waterFrequency: {
            type: Number,
            required: true
        },
        fertilizingFrequency: {
            type: Number,
            required: true,
        },
        light: {
            type: String,
            enum: ['shadow', 'direct sunlight', 'indirect sunlight'],
            required: true
        }
    },
    meta: {
        lastWatered: {
            byUserId: {
                type: String,
            },
            atTime: {
                type: Date,
            }
        },
        lastFertilized: {
            byUserId: {
                type: String,
            },
            atTime: {
                type: Date,
            }
        }
    }
});

const Plant = mongoose.model('plant', PlantSchema);
module.exports = Plant;
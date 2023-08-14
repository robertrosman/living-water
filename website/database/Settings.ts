import { nanoid } from '../utils/nanoid'
import { model } from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'

export interface Settings extends Item {
    id: string,
    name: string,
    measurementInterval: number,
    wateringAmount: number,
    soilMoistureThreshold: number,
    wateringHours: number[]
}

export const SettingsModel = model<Settings>("Settings", {
    id: {
        type: String,
        default: nanoid
    },
    name: String,
    measurementInterval: Number,
    wateringAmount: Number,
    soilMoistureThreshold: Number,
    wateringHours: {
        type: Array,
        schema: Number
    }
}, {
    tableName: "living-water-settings"
})
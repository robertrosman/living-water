import { nanoid } from '../utils/nanoid'
import { model } from 'dynamoose'
import dayjs, { Dayjs } from 'dayjs'
import { Item } from 'dynamoose/dist/Item'

export interface Stats extends Item {
    id: string
    gardenId: string
    soilMoisture: number,
    waterLevel: number,
    wateringAmount: number,
    createdAt: string
}

export const StatsModel = model<Stats>("Stats", {
    id: {
        type: String,
        default: nanoid
    },
    gardenId: {
        type: String,
        index: true
    },
    soilMoisture: Number,
    waterLevel: Number,
    wateringAmount: Number,
    createdAt: {
        type: String,
        default: () => dayjs().toISOString(),
        index: true,
        rangeKey: true
    }
}, {
    tableName: "living-water-stats"
})

interface QueryStatsArguments {
 gardenId: string
 from: Dayjs
 to: Dayjs 
}

StatsModel.methods.set("queryStats", async function ({gardenId, from, to}: QueryStatsArguments) {
    return StatsModel
        .query("gardenId").eq(gardenId)
        .and()
        .where("createdAt").ge(from.toISOString())
        .where("createdAt").le(to.toISOString())
        .sort("ascending")
        .exec()
})
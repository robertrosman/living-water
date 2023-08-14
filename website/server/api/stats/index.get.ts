import { StatsModel } from "../../../database/Stats"
import dayjs from 'dayjs'

export default defineEventHandler(async event => {
    const { gardenId, ...query } = await getQuery(event)
    const from = dayjs(query.from as string)
    const to = dayjs(query.to as string)
    return StatsModel.queryStats({ gardenId, from, to })
  })
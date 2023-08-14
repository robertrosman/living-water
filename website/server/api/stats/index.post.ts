import { StatsModel } from "../../../database/Stats"

export default defineEventHandler(async event => {
  const stats = await readBody(event)
  return StatsModel.create(stats)
})
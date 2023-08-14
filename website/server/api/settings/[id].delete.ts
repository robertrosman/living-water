import { SettingsModel } from "../../../database/Settings"

export default defineEventHandler(async event => {
  const { id } = await getRouterParams(event)
  await SettingsModel.delete(id)
  return `Deleted ${id}`
})
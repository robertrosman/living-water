import { SettingsModel } from "../../../database/Settings"

export default defineEventHandler(async event => {
  const settings = await readBody(event)
  if (settings.id) {
    return SettingsModel.update(settings)
  }
  else {
    return SettingsModel.create(settings)
  }
})
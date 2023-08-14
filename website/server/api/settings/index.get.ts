import { SettingsModel } from "../../../database/Settings"
import { formatSettingsBody } from "../../../utils/formatSettingsBody"

export default defineEventHandler(async event => {
  // NOTE: This should probably _not_ be exposed!
  const allSettings = await SettingsModel.scan().exec()
  return allSettings?.map(formatSettingsBody)
})
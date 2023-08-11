import { getSettings } from "../../../utils/database"
import { formatSettingsBody } from "../../../utils/formatSettingsBody"

export default defineEventHandler(async event => {
  // NOTE: This should probably _not_ be exposed!
    const allSettings = await getSettings()
    return allSettings?.map(formatSettingsBody)
  })
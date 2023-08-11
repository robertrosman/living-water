import { settingsSchema } from "../../../schemas/settings"
import { editSettings } from "../../../utils/database"

export default defineEventHandler(async event => {
  const settings = await readBody(event)
  settingsSchema.parse(settings)
  return editSettings(settings)
})
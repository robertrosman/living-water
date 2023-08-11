import { settingsSchema } from "../../../schemas/settings"
import { deleteSettings } from "../../../utils/database"

export default defineEventHandler(async event => {
  const { id } = await getRouterParams(event)
  settingsSchema.shape.id.parse(id)
  return deleteSettings(id)
})
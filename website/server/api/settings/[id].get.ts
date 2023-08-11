import { settingsSchema } from "../../../schemas/settings"
import { getSettingsById } from "../../../utils/database"
import { formatSettingsBody } from "../../../utils/formatSettingsBody"

export default defineEventHandler(async event => {
    const { id } = await getRouterParams(event)
    settingsSchema.shape.id.parse(id)
    const settings = await getSettingsById(id)
    return formatSettingsBody(settings)
  })
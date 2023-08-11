import { getSettingsById } from "../../../utils/database"
import { formatSettingsBody } from "../../../utils/formatSettingsBody"

export default defineEventHandler(async event => {
    const { id } = await getRouterParams(event)
    const settings = await getSettingsById(id)
    return formatSettingsBody(settings)
  })
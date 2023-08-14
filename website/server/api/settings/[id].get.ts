import { SettingsModel } from "../../../database/Settings"
import { formatSettingsBody } from "../../../utils/formatSettingsBody"

export default defineEventHandler(async event => {
    const { id } = await getRouterParams(event)
    const settings = await SettingsModel.get(id)
    if (settings) {
      return formatSettingsBody(settings)
    }
  })
import { deleteSettings } from "../../../utils/database"

export default defineEventHandler(async event => {
  const { id } = await getRouterParams(event)
  return deleteSettings(id)
})
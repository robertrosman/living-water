import { editSettings } from "../../../utils/database"

export default defineEventHandler(async event => {
  const body = await readBody(event)
  return editSettings(body)
})
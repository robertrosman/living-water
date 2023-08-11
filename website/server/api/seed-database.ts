import { seed } from "../../utils/database"

export default defineEventHandler((event) => {
    return seed()
  })
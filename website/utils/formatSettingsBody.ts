import { Settings } from "../database/Settings";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export function formatSettingsBody(settings: Settings) {
  const now = dayjs().tz("Europe/Stockholm")
    const wateringHourNow = settings.wateringHours.includes(now.hour());
    return {
      now,
      timestamp: now.unix(),
      hour: now.hour(),
      wateringHourNow,
      ...settings
    }
  }
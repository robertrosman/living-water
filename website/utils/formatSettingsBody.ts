import { Settings } from "../schemas/settings";

export function formatSettingsBody(settings: Settings) {
    const now = new Date();
    const hour = now.toLocaleString('en-US', { 
      timeZone: 'Europe/Stockholm', 
      hour12: false, 
      hour: 'numeric'
    });
    const wateringHourNow = settings.wateringHours.includes(parseInt(hour));
    return {
      now,
      hour: parseInt(hour),
      wateringHourNow,
      ...settings
    }
  }
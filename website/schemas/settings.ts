import z from 'zod'

export const settingsSchema = z.object({
    id: z.string(),
    name: z.string(),
    measurementInterval: z.number().min(1),
    wateringAmount: z.number().min(1),
    soilMoistureThreshold: z.number().min(0).max(1024),
    wateringHours: z.number().array()
})

export type Settings = z.infer<typeof settingsSchema>
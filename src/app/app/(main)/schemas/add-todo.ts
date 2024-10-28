import { z } from 'zod'

export const addTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).optional(),
  doneAt: z.date().optional(),
})

export type AddTodoSchema = z.infer<typeof addTodoSchema>

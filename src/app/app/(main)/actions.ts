'use server'

import { prisma } from '@/services/database'
import { auth } from '../../../../auth'
import { AddTodoSchema } from './schemas/add-todo'

export async function getUserTodos() {
  const session = await auth()

  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return todos
}

export async function addOrUpdateTodo(data: AddTodoSchema) {
  const session = await auth()

  const { id, title, doneAt } = data

  if (id) {
    const todo = await prisma.todo.update({
      where: { id, userId: String(session?.user?.id!) },
      data: { title, doneAt },
    })

    return todo
  }

  const todo = await prisma.todo.create({
    data: { title: title!, userId: String(session?.user?.id!) },
  })

  return todo
}

export async function deleteTodo(id: string) {
  const session = await auth()

  const todo = await prisma.todo.findUnique({
    where: { id, userId: String(session?.user?.id!) },
  })

  if (!todo) {
    throw new Error('Todo not found')
  }

  await prisma.todo.delete({
    where: { id: todo.id },
  })
}

export async function toggleTodo(id: string) {
  const session = await auth()

  const todo = await prisma.todo.findUnique({
    where: { id, userId: String(session?.user?.id!) },
  })

  if (!todo) {
    throw new Error('Todo not found')
  }

  await prisma.todo.update({
    where: { id, userId: String(session?.user?.id!) },
    data: { doneAt: todo?.doneAt === null ? new Date() : null },
  })
}

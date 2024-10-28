'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { addTodoSchema } from '../schemas/add-todo'

import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { addOrUpdateTodo } from '../actions'

export function AddTodoSheet() {
  const { toast } = useToast()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const hookForm = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
  })

  const handleSubmit = hookForm.handleSubmit(async (data) => {
    try {
      await addOrUpdateTodo({
        title: data.title,
        doneAt: new Date(),
      })
      toast({
        title: 'Tarefa adicionada',
        description: 'Tarefa adicionada com sucesso',
      })
      router.refresh()
      ref.current?.click()
    } catch (error) {
      toast({
        title: 'Erro ao adicionar tarefa',
        description: 'Ocorreu um erro ao adicionar a tarefa',
        variant: 'destructive',
      })
    }
  })

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div ref={ref}>
            <Button className="w-12 h-12 mt-10">
              <PlusIcon className="w-4 h-4 text-secondary" />
            </Button>
          </div>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader className="mb-3">
            <SheetTitle>Adicionar tarefa</SheetTitle>
            <SheetDescription>
              Adicione uma nova tarefa para gerenciar. 🚀
            </SheetDescription>
          </SheetHeader>

          <SheetContent>
            <Form {...hookForm}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField
                  {...hookForm.register('title')}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adicione um título"
                          {...field}
                          value={undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" onClick={handleSubmit}>
                  Adicionar
                </Button>
              </form>
            </Form>
          </SheetContent>
        </SheetContent>
      </Sheet>
    </div>
  )
}

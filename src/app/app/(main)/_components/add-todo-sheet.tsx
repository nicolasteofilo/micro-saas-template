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

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Título é obrigatório',
  }),
})

export function AddTodoSheet() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-12 h-12 mt-10">
          <PlusIcon className="w-4 h-4 text-secondary" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader className="mb-3">
          <SheetTitle>Adicionar tarefa</SheetTitle>
          <SheetDescription>
            Adicione uma nova tarefa para gerenciar. 🚀
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Adicione um título" {...field} />
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
    </Sheet>
  )
}

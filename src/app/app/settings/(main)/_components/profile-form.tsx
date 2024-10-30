'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/hooks/use-toast'
import { SignOut } from '@/lib/auth-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deleteProfile, updateProfile } from '../actions'
import { updateProfileSchema } from '../schemas/update-profile'

interface ProfileFormProps {
  user: Session['user']
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const maxLengthName = 32

  const formUpdateProfile = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: async () => {
      return {
        name: user?.name || '',
      }
    },
  })

  const handleSubmitUpdateProfile = formUpdateProfile.handleSubmit(
    async (data) => {
      try {
        await updateProfile({
          name: data.name,
        })
        toast({
          title: 'Perfil atualizado com sucesso',
          description: 'Seu perfil foi atualizado com êxito.',
        })
        router.refresh()
      } catch (error) {
        console.log({ error })
        toast({
          title: 'Erro ao atualizar perfil',
          description: 'Ocorreu um erro ao atualizar o perfil',
          variant: 'destructive',
        })
      }
    },
  )

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile()
      toast({
        title: 'Perfil deletado com sucesso',
        description: 'Seu perfil foi deletado com êxito.',
      })
    } catch (error) {
      toast({
        title: 'Erro ao deletar perfil',
        description: 'Ocorreu um erro ao deletar o perfil',
        variant: 'destructive',
      })
    } finally {
      await SignOut()
      router.push('/')
    }
  }

  return (
    <div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Seu Nome</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Esse é o nome que será exibido no seu perfil.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <Input
              id="name"
              className="w-full text-sm"
              maxLength={maxLengthName}
              {...formUpdateProfile.register('name')}
            />
          </div>
          <div className="h-px bg-gray-200 my-4" aria-hidden="true" />
          <Separator />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Máximo de {maxLengthName} caracteres
            </p>
            <Button
              type="submit"
              isLoading={formUpdateProfile.formState.isSubmitting}
              onClick={handleSubmitUpdateProfile}
            >
              {formUpdateProfile.formState.isSubmitting ? (
                <Spinner className="w-4 h-4" />
              ) : (
                'Salvar alterações'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mt-8 border-dotted border-red-600">
        <CardHeader className="p-6">
          <CardTitle className="text-sm font-medium text-red-700">
            Deletar Perfil
          </CardTitle>
          <CardDescription className="text-sm text-red-600">
            Esta ação é irreversível. Ao deletar seu perfil, todos os seus dados
            serão permanentemente removidos.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-6 -mt-6">
          <div className="h-px bg-red-200 my-4" aria-hidden="true" />
          <Separator />
          <div className="w-full flex justify-end">
            <Button
              onClick={handleDeleteProfile}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Deletar Perfil
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/hooks/use-toast'
import { SignIn } from '@/lib/auth-action'
import { RiGoogleFill } from '@remixicon/react'
import { useState } from 'react'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function signInWithGoogle() {
    setIsLoading(true)
    try {
      await SignIn()
    } catch {
      toast({
        title: 'Erro ao entrar, tente novamente!',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Bem-vindo
          </CardTitle>
          <CardDescription className="text-center">
            Efetue agora seu login para ter acesso a todo o sistema!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={signInWithGoogle}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <RiGoogleFill
                  className="me-3 text-gray-900 dark:text-white/60"
                  size={16}
                  aria-hidden="true"
                />
                Entrar com o Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

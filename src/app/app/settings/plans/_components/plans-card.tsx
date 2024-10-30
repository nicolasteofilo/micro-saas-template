import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { getUserQuota } from '@/services/stripe'
import { Check, Rocket } from 'lucide-react'
import { auth } from '../../../../../../auth'
import { createSubscribeSession } from '../actions'

export async function PlansCard() {
  const session = await auth()

  const { plan, usagePercentage, currentTasks, availableTasks } =
    await getUserQuota(session?.user.id as string)

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Planos e Uso</CardTitle>

          <CardDescription>
            Você está atualmente no plano <Badge>{plan.name}</Badge>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Tarefas Criadas
                <span className="ml-2">
                  <Check className="w-4 h-4" />
                </span>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Acompanhe o progresso das suas tarefas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold">
                  {currentTasks}/{availableTasks}
                </span>
                <span className="text-sm text-muted-foreground">Tarefas</span>
              </div>
              <Progress className="w-full ml-4" value={usagePercentage} />
            </CardContent>
          </Card>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col gap-4 mt-3">
          <span>Para um maior limite, assine agora mesmo o plano Plus.</span>
          <Button onClick={createSubscribeSession}>
            Assine por R$ 9,00/mês
            <Rocket />
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

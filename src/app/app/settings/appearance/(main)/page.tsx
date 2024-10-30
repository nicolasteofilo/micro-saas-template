'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeForm } from '../_components/theme-form'

export default function Appearance() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Aparencia</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeForm />
        </CardContent>
      </Card>
    </div>
  )
}

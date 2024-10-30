import { PropsWithChildren } from 'react'
import { AppPage } from '../_components/page'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppPage title="Configurações" path="/app/settings">
      {children}
    </AppPage>
  )
}

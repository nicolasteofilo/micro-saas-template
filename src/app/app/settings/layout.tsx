import { PropsWithChildren } from 'react'
import { AppPage } from '../_components/page'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppPage title="Configurações" path="/app/settings">
      <div className="grid grid-cols-[12rem_1fr] gap-12">
        <SettingsSidebar />
        {children}
      </div>
    </AppPage>
  )
}

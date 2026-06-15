import type {ReactNode} from 'react'
import Header from './Header'
import {LoginButton} from './LoginButton'

export function SiteLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header rightSlot={<LoginButton />} />
      <main className="flex-1">{children}</main>
    </div>
  )
}

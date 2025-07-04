import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D SOLAR SYSTEM',
  description: 'THREE.JS',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

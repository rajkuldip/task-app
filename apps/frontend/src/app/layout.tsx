export const metadata = {
  title: 'Task App POC',
  description: 'This poc is created using NextJs under PNPM Workspace making use of AWS cloud.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Task App POC</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analysis/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/analysis/upload"!</div>
}

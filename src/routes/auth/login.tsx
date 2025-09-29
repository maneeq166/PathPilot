import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login to Your Account
        </h2>
        <form className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="mt-2">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/auth/register" className="text-blue-500 underline">Register</a>
        </p>
      </div>
    </div>
  )
}

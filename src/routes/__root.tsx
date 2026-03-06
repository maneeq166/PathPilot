import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />

      <Outlet />

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeButton={false}
        icon={false}
        toastClassName={(context) =>
          `pp-toast pp-toast--${context?.type ?? 'default'}`
        }
        bodyClassName="pp-toast-body"
        progressClassName="pp-toast-progress"
      />

      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})

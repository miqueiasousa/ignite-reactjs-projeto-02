import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
    </div>
  )
}

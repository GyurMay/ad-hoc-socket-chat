import { createBrowserRouter, Outlet } from 'react-router-dom'
import UserList from '../pages/UserList'
import ChatRoom from '../pages/ChatRoom'

import SharedLayout from '../components/SharedLayout'
import '../App.css';
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <SharedLayout />
      </>
    ),
    children: [
      {
        path: '/',
        element: (
          <>
          <UserList />
          </>
        ),
      },
      {
        path: '/chat/:userId',
        element: (
          <>
          <UserList />
          <ChatRoom />
          </>
        ),
      },
    //   {
    //     path: '/dashboard',
    //     element: (
    //       <Protected>
    //         <Dashboard />
    //       </Protected>
    //     ),
    //   },
    ],
  },
])

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './components/home'
import Post from './components/post'
import PostDetail from './components/postdetail'

const Router = () => {
    const router = createBrowserRouter (
        [
            {
                element: <App/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>
                    },
                    {
                        path: '/blog',
                        element: <Post/>
                    },
                    {
                        path: '/blog/:id',
                        element: <PostDetail/>
                    }
                ]
            }
        ]
    )
    return <RouterProvider router={router}/>
}

export default Router
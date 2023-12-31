import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './components/home'
import Post from './components/post'
import Contact from './components/contact'
import Blog from './components/blog'
import ErrorPage from './components/errorpage'


const Router = () => {
    const router = createBrowserRouter (
        [
            {
                element: <App/>,
                errorElement: <ErrorPage/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>
                    },
                    {
                        path: '/blog',
                        element: <Blog/>
                    },
                    {
                        path: '/posts/:id',
                        element: <Post/>
                    },
                    {
                        path: '/contact',
                        element: <Contact/>
                    }
                ]
            }
        ]
    )
    return <RouterProvider router={router}/>
}

export default Router
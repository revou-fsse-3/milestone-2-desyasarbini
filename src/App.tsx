import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicLayout } from './layout'
import { HomePage, PokemonPage } from './pages'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  const routes = createBrowserRouter([
    {
      element: <PublicLayout/>,
      children: [
        {
          path:'/',
          element: <PokemonPage/>
        },
        {
          path: '/pokemon',
          element: <HomePage/>
        },
        
      ]
    },
    {
      path: '*',
      element: <h1>404 Page Not found</h1>
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  );
}

export default App;

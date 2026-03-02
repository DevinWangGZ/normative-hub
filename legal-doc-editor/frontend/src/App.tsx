import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DocumentEditor from './pages/DocumentEditor'
import TemplatesPage from './pages/TemplatesPage'
import LoginPage from './pages/LoginPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/editor/:id" element={<DocumentEditor />} />
            <Route path="/templates" element={<TemplatesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
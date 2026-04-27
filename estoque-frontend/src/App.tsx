import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './contexts/NotificationContext'
import Home from './pages/home/home'

function App() {
    const basePath = import.meta.env.VITE_BASE_PATH || '/dev-test/lamir-lims'

    return (
        <NotificationProvider>
            <Router basename={basePath}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </NotificationProvider>
    )
}

export default App
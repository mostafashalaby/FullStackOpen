import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationContextProvider } from './NotificationContext'


ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={new QueryClient()}>
        <NotificationContextProvider>
            <Router>
                <App />
            </Router>
        </NotificationContextProvider>
    </QueryClientProvider>
)
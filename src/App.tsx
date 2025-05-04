import { ThemeProvider } from "@/components/theme-provider"
//import { ModeToggle } from "./components/mode-toggle"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./pages/uploader/Navbar"
import NotFound from "./pages/NotFound"
import Dashboard from "./pages/uploader/Dashboard"
import Upload from "./pages/uploader/Upload"
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import Access from "./pages/accessor/Access"
import { Toaster } from "sonner";
import UploadPapers from "./pages/uploader/PapersUpload"
import SearchPage from "./pages/accessor/SearchPage"
import PreviousYearPapers from "./pages/accessor/PreviousYearPapers"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import ResendEmailPage from "./pages/ResendEmailPage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/access" element={<Access />} />
            <Route path="/uploadpapers" element={<UploadPapers />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/previous-papers" element={<PreviousYearPapers />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/resend-verification" element={<ResendEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />



            <Route path="/navbar" element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>}
            />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />


            <Route path="/*" element={<NotFound />} />




          </Routes>

        </Router>
        <Toaster richColors position="top-right" />

      </AuthProvider>

    </ThemeProvider>
  )
}

export default App

import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import PortfolioBuilder from "../pages/portfolio-builder/PortfolioBuilder"
import CaseStudyDetail from "../pages/case-study/CaseStudyDetail"
import PortfolioPreview from "../pages/PortfolioPreview"
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import AnalyticsDashboard from "../pages/AnalyticsDashboard"

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/builder" element={<PortfolioBuilder />} />
            <Route path="/preview/:portfolioId" element={<PortfolioPreview />} />
            <Route path="/case-study/:id" element={<CaseStudyDetail />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>

    )
}

export default Navigation;
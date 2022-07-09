import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { GithubProvider } from "./context/github/GithubContext";

function App() {
    return (
        <GithubProvider>
            <Router>
                <div className="flex flex-col justify-between h-screen">
                    <Navbar />
                    <main className="container mx-auto px-3 pb-12">
                        <Routes
                        //Each component when accessed will bring you to the following path
                        >
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/notfound" element={<NotFound />} />
                            {/*if you try to go to any of the pages that don't
                            exist you'll get sent to the NotFound page */}
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </GithubProvider>
    );
}

export default App;

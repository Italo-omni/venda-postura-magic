
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import Checkout from "@/pages/Checkout";
import Success from "@/pages/Success";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
        <Footer />
        <FloatingCTA />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

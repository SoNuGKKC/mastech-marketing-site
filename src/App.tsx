import { Routes, Route } from "react-router-dom";
import JaduSessionBootstrap from "./components/JaduSessionBootstrap";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EvolutionGatekeeper from "./pages/EvolutionGatekeeper";
import LoginHub from "./pages/LoginHub";
import LoginField from "./pages/LoginField";
import LoginAdmin from "./pages/LoginAdmin";
import AuthCallback from "./pages/AuthCallback";
import AuthRecovery from "./pages/AuthRecovery";

export default function App() {
  return (
    <>
      <JaduSessionBootstrap />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginHub />} />
          <Route path="/login/field" element={<LoginField />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/recovery" element={<AuthRecovery />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/evolution" element={<EvolutionGatekeeper />} />
        </Routes>
      </Layout>
    </>
  );
}

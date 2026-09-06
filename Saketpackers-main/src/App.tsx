import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ScrollManager from './components/ScrollManager';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCTABar from './components/MobileCTABar';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Gallery from './pages/Gallery';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ReviewFlow from './pages/ReviewFlow';
import { SERVICES } from './data/services';
import { Loader2 } from 'lucide-react';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function AdminArea() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-navy-950">
            <Loader2 className="h-8 w-8 animate-spin text-gold-400" aria-label="Loading admin" />
          </div>
        }
      >
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

function SiteChrome() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <AdminArea />;

  if (pathname.startsWith('/review')) {
    return (
      <div className="review-surface grain relative min-h-[100dvh] overflow-x-hidden bg-ink">
        <div className="aura" aria-hidden="true" />
        <Routes>
          <Route path="/review" element={<ReviewFlow />} />
          <Route path="/review/*" element={<ReviewFlow />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {SERVICES.map((service) => (
            <Route
              key={service.key}
              path={service.path}
              element={<ServicePage serviceKey={service.key} />}
            />
          ))}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <SiteChrome />
    </BrowserRouter>
  );
}

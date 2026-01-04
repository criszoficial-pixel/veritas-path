import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Leer from "./pages/Leer";
import LeerCapitulo from "./pages/LeerCapitulo";
import Aprender from "./pages/Aprender";
import Guia from "./pages/Guia";
import GuiaTema from "./pages/GuiaTema";
import Perfil from "./pages/Perfil";
import Marcadores from "./pages/Marcadores";
import Historial from "./pages/Historial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leer" element={<Leer />} />
            <Route path="/leer/:bookName/:chapter" element={<LeerCapitulo />} />
            <Route path="/aprender" element={<Aprender />} />
            <Route path="/guia" element={<Guia />} />
            <Route path="/guia/:topicId" element={<GuiaTema />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/marcadores" element={<Marcadores />} />
            <Route path="/historial" element={<Historial />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

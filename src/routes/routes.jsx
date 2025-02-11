import React from "react";
import { Route, Routes } from "react-router-dom";

// Import des pages
import LandingPage from "../pages/landing/LandingPage";
import Logout from "../pages/landing/Logout";
import PrivateRoute from "./PrivateRoute";

// Utilisateur
import LayoutParentUtilisateur from "../pages/utilisateur/layout/LayoutUtilisateur";
import DashboardPageUtilisateur from "../pages/utilisateur/dashboard/DashboardPageUtilisateur";
import Depot from "../pages/utilisateur/transaction/Depot";
import Retrait from "../pages/utilisateur/transaction/Retrait";
import DetailCryptoPage from "../pages/utilisateur/crypto/DetailCryptoPage";
import VenteCryptoPage from "../pages/utilisateur/vente/VenteCryptoPage";
import AchatCryptoPage from "../pages/utilisateur/achat/AchatCryptoPage";
import ListeTransactionFond from "../pages/utilisateur/transaction/ListeTransactionFond";
import ListeTransactionCrytpo from "../pages/utilisateur/transaction/ListeTransactionCrytpo";

// Admin
import ListeAllTransactionFond from "../pages/admin/transaction/ListeAllTransactionFond";
import ListeAllTransactionCrytpo from "../pages/admin/transaction/ListeAllTransactionCrytpo";
import PageCrypto from "../pages/utilisateur/liste/PageCrypto";
import ListeAnalyse from "../pages/admin/analyse/ListeAnalyse";
import LayoutParentAdmin from "../pages/admin/layout/LayoutAdmin";
import DashboardPageAdmin from "../pages/admin/dashboard/DashboardPageAdmin";
import ListeAllTransactionEnAttente from "../pages/admin/transaction/ListeAllTransactionEnAttente";
import AccesInterdit from "../pages/landing/AccesInterdit";
import ListeCommission from "../pages/admin/commission/ListeCommission";
import AnalyseCommission from "../pages/admin/commission/AnalyseCommission";
import AccesRefuse from "../pages/landing/AccesRefuse";
import NonAutorise from "../pages/landing/NonAutorise";

const RenderRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/accesInterdit" element={<AccesInterdit />} />
      <Route path="/accesRefuse" element={<AccesRefuse />} />
      <Route path="/nonAutorise" element={<NonAutorise />} />

      {/* Routes Utilisateur (Protégées) */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_USER"]} />}>
        <Route path="/utilisateur" element={<LayoutParentUtilisateur />}>
          <Route path="dashboard" element={<DashboardPageUtilisateur />} />
          <Route path="retrait" element={<Retrait />} />
          <Route path="depot" element={<Depot />} />
          <Route path="cryptos" element={<PageCrypto />} />
          <Route path="cryptos/:id" element={<DetailCryptoPage />} />
          <Route path="cryptos/achat/:id" element={<AchatCryptoPage />} />
          <Route path="cryptos/vente/:id" element={<VenteCryptoPage />} />
          <Route path="listeTransactionFond" element={<ListeTransactionFond />} />
          <Route path="listeTransactionCrypto" element={<ListeTransactionCrytpo />} />
        </Route>
      </Route>

      {/* Routes Admin (Protégées) */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route path="/admin" element={<LayoutParentAdmin />}>
          <Route path="dashboard" element={<DashboardPageAdmin />} />
          <Route path="listeAllTransactionCrypto" element={<ListeAllTransactionCrytpo />} />
          <Route path="listeAllTransactionFond" element={<ListeAllTransactionFond />} />
          <Route path="analyseCrypto" element={<ListeAnalyse />} />
          <Route path="listeAllTransactionEnAttente" element={<ListeAllTransactionEnAttente />} />
          <Route path="listeCommission" element={<ListeCommission />} />
          <Route path="analyseCommission" element={<AnalyseCommission />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { RenderRoutes };

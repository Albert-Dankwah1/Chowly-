import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layout/app-layout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BannersPage } from "@/pages/banners-page";
import { CategoriesPage } from "@/pages/categories-page";
import { CustomersPage } from "@/pages/customers-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { LoginPage } from "@/pages/login-page";
import { NoAccessPage } from "@/pages/no-access-page";
import { OrderDetailPage } from "@/pages/order-detail-page";
import { OrdersPage } from "@/pages/orders-page";
import { RestaurantDetailPage } from "@/pages/restaurant-detail-page";
import { RestaurantsPage } from "@/pages/restaurants-page";
import { RidersPage } from "@/pages/riders-page";
import { SettingsPage } from "@/pages/settings-page";
import { ProtectedRoute } from "@/routes/protected-route";
import { PublicOnlyRoute } from "@/routes/public-only-route";
import { queryClient } from "@/lib/query-client";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Sidebar buttons render tooltips when collapsed, which need this. */}
      <TooltipProvider>
        <BrowserRouter>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Signed in but wrong role: reachable without being an admin. */}
          <Route path="/no-access" element={<NoAccessPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/banners" element={<BannersPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId" element={<OrderDetailPage />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
              <Route path="/riders" element={<RidersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>

      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

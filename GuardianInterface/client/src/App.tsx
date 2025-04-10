import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Layouts
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

// Pages
import Dashboard from "@/pages/Dashboard";
import Cameras from "@/pages/Cameras";
import Incidents from "@/pages/Incidents";
import EmergencyServices from "@/pages/EmergencyServices";
import Notifications from "@/pages/Notifications";
import Configuration from "@/pages/Configuration";
import History from "@/pages/History";
import AIModule from "@/pages/AIModule";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-dark p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/cameras" component={Cameras} />
            <Route path="/incidents" component={Incidents} />
            <Route path="/emergency-services" component={EmergencyServices} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/configuration" component={Configuration} />
            <Route path="/history" component={History} />
            <Route path="/ai-module" component={AIModule} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;

import { useQuery } from "@tanstack/react-query";
import AlertBanner from "@/components/dashboard/AlertBanner";
import StatsSummary from "@/components/dashboard/StatsSummary";
import CameraOverview from "@/components/dashboard/CameraOverview";
import RecentIncidents from "@/components/dashboard/RecentIncidents";
import EmergencyServices from "@/components/dashboard/EmergencyServices";
import SystemMonitoring from "@/components/dashboard/SystemMonitoring";

export default function Dashboard() {
  // Get critical incidents count
  const { data: incidents } = useQuery({
    queryKey: ['/api/incidents/recent'],
  });
  
  const criticalIncidents = incidents?.filter(
    (incident: any) => incident.status === 'pending' && incident.severity === 'Critique'
  ).length || 0;

  return (
    <>
      {/* Alert Banner for Critical Incidents */}
      <AlertBanner 
        count={criticalIncidents} 
        onClick={() => window.location.href = '/incidents'}
      />
      
      {/* Stats Summary Cards */}
      <StatsSummary />
      
      {/* Camera Overview and Incidents */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <CameraOverview />
        <RecentIncidents />
      </div>
      
      {/* Emergency Services and System Monitoring */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <EmergencyServices />
        <SystemMonitoring />
      </div>
    </>
  );
}

import { 
  CctvIcon, AlertTriangleIcon, NotificationIcon, 
  HeartPulseIcon, ArrowUpIcon, CheckboxIcon
} from "@/lib/icons";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  borderColor: string;
  changeText?: string;
  changeColor?: string;
  changeIcon?: React.ReactNode;
}

export default function StatsSummary() {
  const stats: Stat[] = [
    {
      title: "Caméras actives",
      value: 24,
      icon: <CctvIcon className="text-2xl" />,
      iconBgColor: "bg-primary/20",
      iconColor: "text-primary-light",
      borderColor: "border-primary-light",
      changeText: "+2 depuis hier",
      changeColor: "text-success",
      changeIcon: <ArrowUpIcon className="mr-1" />,
    },
    {
      title: "Incidents aujourd'hui",
      value: 8,
      icon: <AlertTriangleIcon className="text-2xl" />,
      iconBgColor: "bg-danger/20",
      iconColor: "text-danger",
      borderColor: "border-danger",
      changeText: "+3 depuis hier",
      changeColor: "text-danger",
      changeIcon: <ArrowUpIcon className="mr-1" />,
    },
    {
      title: "Alertes envoyées",
      value: 15,
      icon: <NotificationIcon className="text-2xl" />,
      iconBgColor: "bg-secondary/20",
      iconColor: "text-secondary",
      borderColor: "border-secondary",
      changeText: "100% traité",
      changeColor: "text-gray-400",
    },
    {
      title: "État du système",
      value: "Opérationnel",
      icon: <HeartPulseIcon className="text-2xl" />,
      iconBgColor: "bg-success/20",
      iconColor: "text-success",
      borderColor: "border-success",
      changeText: "Tous les services OK",
      changeColor: "text-success",
      changeIcon: <CheckboxIcon className="mr-1" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`card bg-dark-light rounded-lg shadow-lg p-6 border-l-4 ${stat.borderColor}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h3 className="font-heading font-bold text-3xl text-white mt-2">
                {stat.value}
              </h3>
              <p className={`text-xs mt-2 ${stat.changeColor} flex items-center`}>
                {stat.changeIcon}
                {stat.changeText}
              </p>
            </div>
            <div className={`${stat.iconBgColor} rounded-full p-3`}>
              <span className={stat.iconColor}>{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

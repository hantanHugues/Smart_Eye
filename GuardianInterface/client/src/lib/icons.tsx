import React from "react";
import { LucideIcon } from "lucide-react";
import {
  LockKeyholeOpen,
  LayoutDashboard,
  Cctv,
  AlertTriangle,
  Users,
  Bell,
  Settings,
  History,
  Brain,
  LogOut,
  Menu,
  Search,
  AlertCircle,
  RefreshCw,
  Maximize,
  X,
  ArrowUp,
  CheckCircle,
  ChevronRight,
  Eye,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Save,
  Calendar,
  Download,
  Check,
  MessageCircle,
  Phone,
  Mail,
  ToggleLeft,
  ToggleRight,
  Filter,
  BarChart2,
  Database,
  Layers,
  Play,
  FileText
} from "lucide-react";

// Pour toutes les icônes, on garde l'interface cohérente en les exportant comme des composants
// qui préservent le style et le comportement tout en utilisant Lucide React

export const ShieldIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <LockKeyholeOpen {...props} />;
export const DashboardIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <LayoutDashboard {...props} />;
export const CctvIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Cctv {...props} />;
export const AlertTriangleIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <AlertTriangle {...props} />;
export const ContactsIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Users {...props} />;
export const NotificationIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Bell {...props} />;
export const SettingsIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Settings {...props} />;
export const HistoryIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <History {...props} />;
export const BrainIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Brain {...props} />;
export const LogoutIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <LogOut {...props} />;
export const MenuIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Menu {...props} />;
export const SearchIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Search {...props} />;
export const NotificationAlertIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Bell {...props} />;
export const QuestionIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <AlertCircle {...props} />;
export const RefreshIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <RefreshCw {...props} />;
export const FullscreenIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Maximize {...props} />;
export const XIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <X {...props} />;
export const ArrowUpIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <ArrowUp {...props} />;
export const CheckboxIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <CheckCircle {...props} />;
export const ArrowRightIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <ChevronRight {...props} />;
export const EyeIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Eye {...props} />;
export const PlusIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Plus {...props} />;
export const PlusCircleIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Plus {...props} />;
export const MoreIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <MoreHorizontal {...props} />;
export const EditIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Edit {...props} />;
export const DeleteIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Trash2 {...props} />;
export const SaveIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Save {...props} />;
export const CalendarIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Calendar {...props} />;
export const FileDownloadIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Download {...props} />;
export const CheckIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Check {...props} />;
export const MessageCircleIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <MessageCircle {...props} />;
export const PhoneIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Phone {...props} />;
export const MailIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Mail {...props} />;
export const ToggleLeftIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <ToggleLeft {...props} />;
export const ToggleRightIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <ToggleRight {...props} />;
export const FilterIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Filter {...props} />;
export const ChartIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <BarChart2 {...props} />;
export const DatabaseIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Database {...props} />;
export const LayersIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Layers {...props} />;
export const PlayIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <Play {...props} />;
export const AlertCircleIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <AlertCircle {...props} />;
export const FileIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => <FileText {...props} />;

// Création d'icônes spécifiques pour certains types d'incidents qui ne sont pas directement dans lucide
export const FireIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => (
  <span className="text-danger">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} width="1em" height="1em">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  </span>
);

export const UserVoiceIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => (
  <span className="text-warning">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} width="1em" height="1em">
      <path d="M12 8a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3Z"/>
      <path d="M19 9v1a7 7 0 0 1-14 0v-1"/>
      <line x1="15" y1="11" x2="19" y2="11"/>
      <line x1="15" y1="6" x2="17" y2="6"/>
      <line x1="15" y1="16" x2="17" y2="16"/>
    </svg>
  </span>
);

export const CarCrashIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => (
  <span className="text-warning">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} width="1em" height="1em">
      <circle cx="5" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
      <path d="M6 15h12l1-5h-14z"/>
      <path d="m4 10 2-8h11l1 3h3l-1 5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  </span>
);

export const UserFollowIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => (
  <span className="text-info">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} width="1em" height="1em">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M16 11h6"/>
      <path d="M19 8v6"/>
    </svg>
  </span>
);

export const HeartPulseIcon: React.FC<React.ComponentProps<typeof LucideIcon>> = (props) => (
  <span className="text-success">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} width="1em" height="1em">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
    </svg>
  </span>
);

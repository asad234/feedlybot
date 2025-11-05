import DashboardEmail from "@/components/DashboardEmail";

interface EmailPageProps {
  onLogin: () => void;
}

export default function EmailPage({ onLogin }: EmailPageProps) {
    return <DashboardEmail onLogin={onLogin} />;
}

import React from "react";
import DashboardOverview from "@/components/DashboardOverview";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  return <DashboardOverview onLogout={onLogout} />;
}

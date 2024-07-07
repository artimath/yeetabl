'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApiKeyManager />
    </DashboardLayout>
  );
}

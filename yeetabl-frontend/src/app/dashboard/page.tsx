'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';
import { CustomerHealthScoreBuilder } from '../../components/CustomerHealthScoreBuilder';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApiKeyManager />
      <h2 className="text-2xl font-bold mt-8 mb-4">Customer Health Score Management</h2>
      <CustomerHealthScoreBuilder />
    </DashboardLayout>
  );
}

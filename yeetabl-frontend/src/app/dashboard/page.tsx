'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ThresholdBuilder } from '../../components/CompositeIndexBuilder';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApiKeyManager />
      <h2 className="text-2xl font-bold mt-8 mb-4">Threshold Management</h2>
      <ThresholdBuilder />
    </DashboardLayout>
  );
}

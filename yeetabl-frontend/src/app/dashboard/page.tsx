'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';
import { CompositeIndexBuilder } from '../../components/CompositeIndexBuilder';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApiKeyManager />
      <h2 className="text-2xl font-bold mt-8 mb-4">Composite Indexes</h2>
      <CompositeIndexBuilder />
    </DashboardLayout>
  );
}

'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';
import CustomerValueIndexBuilder from '../../components/CustomerValueIndexBuilder';
import CompositeIndexWebhookBuilder from '../../components/CompositeIndexWebhookBuilder';
import { SchemaViewer } from '../../components/SchemaViewer';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApiKeyManager />
      <h2 className="text-2xl font-bold mt-8 mb-4">Customer Health Score Management</h2>
      <CompositeIndexWebhookBuilder />
      <h2 className="text-2xl font-bold mt-8 mb-4">Event Tables Schema</h2>
      <SchemaViewer />
    </DashboardLayout>
  );
}

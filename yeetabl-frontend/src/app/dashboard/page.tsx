'use client';
import { ApiKeyManager } from '../../components/ApiKeyManager';
import { DashboardLayout } from '../../components/DashboardLayout';
import CustomerValueIndexBuilder from '../../components/CustomerValueIndexBuilder';
import CompositeIndexWebhookBuilder from '../../components/CompositeIndexWebhookBuilder';
import { SchemaViewer } from '../../components/SchemaViewer';
import { CompiledMetrics } from '../../components/CompiledMetrics';
import { useState } from 'react';
import { eventTables } from '../../dummyData';

export default function Dashboard() {
  const [currentTable, setCurrentTable] = useState(Object.keys(eventTables)[0]);

  const handleTableChange = (tableName: string) => {
    setCurrentTable(tableName);
  };

  return (
    <DashboardLayout>
      <ApiKeyManager />
      <h2 className="text-2xl font-bold mt-8 mb-4">Customer Health Score Management</h2>
      <CompositeIndexWebhookBuilder />
      <div className="flex mt-8 space-x-8">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">Event Tables Schema</h2>
          <SchemaViewer onTableChange={handleTableChange} />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4">Relevant Compiled Metrics</h2>
          <CompiledMetrics currentTable={currentTable} />
        </div>
      </div>
    </DashboardLayout>
  );
}

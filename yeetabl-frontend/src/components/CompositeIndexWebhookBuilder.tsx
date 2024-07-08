import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import WebhookConfigurator from './WebhookConfigurator';
import MetricSelector from './MetricSelector';
import ThresholdSetter from './ThresholdSetter';

interface Metric {
  id: string;
  name: string;
  aggregation: string;
}

interface Threshold {
  metricId: string;
  operator: '>' | '<' | '==' | '>=' | '<=';
  value: number;
}

const CompositeIndexWebhookBuilder: React.FC = () => {
  const [webhookConfigs, setWebhookConfigs] = useState<any[]>([]);
  const [showWebhookConfigurator, setShowWebhookConfigurator] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [thresholds, setThresholds] = useState<Threshold[]>([]);

  const handleConfigureWebhook = (config: any) => {
    setWebhookConfigs([...webhookConfigs, config]);
    setShowWebhookConfigurator(false);
  };

  const handleAddMetric = (metric: Metric) => {
    setMetrics([...metrics, metric]);
  };

  const handleSetThreshold = (threshold: Threshold) => {
    setThresholds([...thresholds, threshold]);
  };

  const handleSave = () => {
    console.log('Saving configuration:', { metrics, thresholds, webhookConfigs });
    // TODO: Implement actual save functionality
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle as="h1">Composite Index Webhook Builder</CardTitle>
        <CardDescription>Create a composite index and configure webhooks for threshold alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Metric Selection Section */}
        <section className="mb-6" aria-labelledby="select-metrics">
          <h2 id="select-metrics" className="text-lg font-semibold mb-2">Select Metrics</h2>
          <MetricSelector onAddMetric={handleAddMetric} />
          {metrics.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Selected Metrics:</h3>
              <ul className="list-disc pl-5" aria-label="List of selected metrics">
                {metrics.map((metric) => (
                  <li key={metric.id}>
                    {metric.name} ({metric.aggregation})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Threshold Setting Section */}
        <section className="mb-6" aria-labelledby="set-thresholds">
          <h2 id="set-thresholds" className="text-lg font-semibold mb-2">Set Thresholds</h2>
          <ThresholdSetter metrics={metrics} onSetThreshold={handleSetThreshold} />
          {thresholds.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Set Thresholds:</h3>
              <ul className="list-disc pl-5" aria-label="List of set thresholds">
                {thresholds.map((threshold, index) => (
                  <li key={index}>
                    {metrics.find(m => m.id === threshold.metricId)?.name} {threshold.operator} {threshold.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Notification Configuration Section */}
        <section aria-labelledby="configure-notifications">
          <h2 id="configure-notifications" className="text-lg font-semibold mb-2">Configure Notifications</h2>
          <div className="space-y-2" aria-label="List of configured notifications">
            {webhookConfigs.map((config, index) => (
              <Card key={index} className="relative">
                <CardHeader className="py-2">
                  <CardTitle className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Notification #{index + 1}</span>
                    <span className="capitalize">{config.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  {config.type === 'endpoint' && <p className="text-sm">Endpoint: {config.endpoint}</p>}
                  {config.type === 'slack' && <p className="text-sm">Slack: Connected</p>}
                  {config.type === 'email' && <p className="text-sm">Email: {config.email}</p>}
                  {config.type === 'sms' && <p className="text-sm">Phone: {config.phoneNumber}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
          {showWebhookConfigurator ? (
            <WebhookConfigurator 
              onConfigureWebhook={handleConfigureWebhook} 
              onCancel={() => setShowWebhookConfigurator(false)}
            />
          ) : (
            <Button onClick={() => setShowWebhookConfigurator(true)} className="mt-2">
              Add New Notification
            </Button>
          )}
        </section>

        <Button onClick={handleSave} className="mt-4">
          Save Composite Index and Webhooks
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompositeIndexWebhookBuilder;

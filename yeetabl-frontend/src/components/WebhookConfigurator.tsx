import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

type WebhookType = 'endpoint' | 'slack' | 'email' | 'sms';

interface WebhookConfig {
  type: WebhookType;
  endpoint?: string;
  slackWebhook?: string;
  email?: string;
  phoneNumber?: string;
}

interface WebhookConfiguratorProps {
  onConfigureWebhook: (config: WebhookConfig) => void;
  onCancel: () => void;
}

const WebhookConfigurator: React.FC<WebhookConfiguratorProps> = ({ onConfigureWebhook, onCancel }) => {
  const [webhookType, setWebhookType] = useState<WebhookType>('endpoint');
  const [config, setConfig] = useState<WebhookConfig>({ type: 'endpoint' });

  const handleTypeChange = (value: WebhookType) => {
    setWebhookType(value);
    setConfig({ ...config, type: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onConfigureWebhook(config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Webhook</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={webhookType} onValueChange={handleTypeChange} className="mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="endpoint" id="endpoint" />
            <Label htmlFor="endpoint">Custom Endpoint</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="slack" id="slack" />
            <Label htmlFor="slack">Slack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms" />
            <Label htmlFor="sms">SMS</Label>
          </div>
        </RadioGroup>

        {webhookType === 'endpoint' && (
          <div className="mb-4">
            <Label htmlFor="endpoint">Endpoint URL</Label>
            <Input
              id="endpoint"
              name="endpoint"
              value={config.endpoint || ''}
              onChange={handleInputChange}
              placeholder="https://api.example.com/webhook"
            />
          </div>
        )}

        {webhookType === 'slack' && (
          <div className="mb-4">
            <Button variant="outline" onClick={() => console.log("Connect to Slack")}>
              Connect to Slack (OAuth)
            </Button>
          </div>
        )}

        {webhookType === 'email' && (
          <div className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={config.email || ''}
              onChange={handleInputChange}
              placeholder="alerts@example.com"
            />
          </div>
        )}

        {webhookType === 'sms' && (
          <div className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={config.phoneNumber || ''}
              onChange={handleInputChange}
              placeholder="+1234567890"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Webhook</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookConfigurator;

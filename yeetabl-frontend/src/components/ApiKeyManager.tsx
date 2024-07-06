import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ApiKeyManager() {
  const [apiKey, setApiKey] = useState<string | null>(null);

  const generateApiKey = () => {
    // In a real application, this would be a call to your backend
    const newApiKey = 'sk_' + Math.random().toString(36).substr(2, 9);
    setApiKey(newApiKey);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key Management</CardTitle>
        <CardDescription>Generate and manage your API keys here</CardDescription>
      </CardHeader>
      <CardContent>
        {apiKey ? (
          <div className="space-y-4">
            <Input
              type="text"
              value={apiKey}
              readOnly
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
          </div>
        ) : (
          <Button onClick={generateApiKey}>Generate New API Key</Button>
        )}
      </CardContent>
    </Card>
  );
}

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const dummyLogs = [
  { id: 1, message: 'User login failed' },
  { id: 2, message: 'Database connection error' },
  { id: 3, message: 'API rate limit exceeded' },
  { id: 4, message: 'New user registration' },
  { id: 5, message: 'Payment processing error' },
];

export const AdminNotification: React.FC = () => {
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);

  const handleLogSelection = (logId: number) => {
    setSelectedLogs(prev =>
      prev.includes(logId) ? prev.filter(id => id !== logId) : [...prev, logId]
    );
  };

  const sendNotification = async () => {
    const selectedLogMessages = dummyLogs
      .filter(log => selectedLogs.includes(log.id))
      .map(log => log.message);

    const url = 'https://api.bluefox.email/v1/accounts/668ce9ec71935df50e4d04c4/projects/668ceb2c71935df50e4d069a/transactional-emails/668cf23371935df50e4d0b7d/send';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_APIKEY'
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          data: {
            logs: JSON.stringify(selectedLogMessages)
          }
        })
      });

      if (response.ok) {
        alert('Notification sent successfully!');
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Admin Notification</h3>
      <div className="space-y-2 mb-4">
        {dummyLogs.map(log => (
          <div key={log.id} className="flex items-center">
            <Checkbox
              id={`log-${log.id}`}
              checked={selectedLogs.includes(log.id)}
              onCheckedChange={() => handleLogSelection(log.id)}
            />
            <label htmlFor={`log-${log.id}`} className="ml-2 text-sm">
              {log.message}
            </label>
          </div>
        ))}
      </div>
      <Button
        onClick={sendNotification}
        disabled={selectedLogs.length === 0}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Send Admin Notification
      </Button>
    </div>
  );
};

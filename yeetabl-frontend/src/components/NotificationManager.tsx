import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { toast } from './ui/use-toast';

interface Notification {
  id: string;
  type: 'webhook' | 'email' | 'slack';
  destination: string;
}

interface NotificationManagerProps {
  notifications: Notification[];
  onNotificationsChange: (notifications: Notification[]) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  notifications,
  onNotificationsChange,
}) => {
  const [newNotification, setNewNotification] = useState<Notification>({
    id: '',
    type: 'webhook',
    destination: '',
  });

  const handleAddNotification = () => {
    if (newNotification.destination) {
      const updatedNotifications = [
        ...notifications,
        { ...newNotification, id: Date.now().toString() },
      ];
      onNotificationsChange(updatedNotifications);
      setNewNotification({ id: '', type: 'webhook', destination: '' });
      toast({
        title: 'Success',
        description: 'Notification added successfully!',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please provide a destination for the notification.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveNotification = (id: string) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    onNotificationsChange(updatedNotifications);
    toast({
      title: 'Success',
      description: 'Notification removed successfully!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="flex items-center justify-between p-4">
                <span>
                  {notification.type}: {notification.destination}
                </span>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveNotification(notification.id)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <div className="flex items-center space-x-2">
            <Select
              value={newNotification.type}
              onValueChange={(value) =>
                setNewNotification({ ...newNotification, type: value as 'webhook' | 'email' | 'slack' })
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Destination"
              value={newNotification.destination}
              onChange={(e) =>
                setNewNotification({ ...newNotification, destination: e.target.value })
              }
              className="flex-grow"
            />
            <Button onClick={handleAddNotification}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const HelpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    'Get your API key',
    'Go to Segment',
    'Set up a webhook action destination',
    'Choose the events you want to send',
    'Add our api key and webhook url to your Segment webhook action',
    'Test your webhook action',
    'Wait for some data to populate in our analytics engine',
    'Create compiled metrics',
    'Create thresholds',
    'Add notifications',
    'Voila! Your system is now set up and running',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm text-muted-foreground">
          Need help?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Getting Started</DialogTitle>
          <DialogDescription>
            Follow these steps to set up your threshold monitoring system:
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal list-inside space-y-2 mt-4">
          {steps.map((step, index) => (
            <li key={index} className="text-sm">
              {step}
            </li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
};

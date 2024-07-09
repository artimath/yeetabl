import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LogEvent = {
  id: string;
  company: string;
  eventType: string;
  timestamp: string;
  data: {
    userId: string;
    teamSize: number;
    serviceType: string;
    monthlyCost: number;
  };
};

const companies = ['Acme Inc.', 'TechCorp', 'DataSoft', 'CloudNine', 'ByteWise'];
const eventTypes = ['User Signup', 'Plan Upgrade', 'Team Expansion', 'Feature Usage'];
const serviceTypes = ['Basic', 'Pro', 'Enterprise'];

const generateRandomEvent = (): LogEvent => ({
  id: Math.random().toString(36).substr(2, 9),
  company: companies[Math.floor(Math.random() * companies.length)],
  eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
  timestamp: new Date().toISOString(),
  data: {
    userId: `user_${Math.floor(Math.random() * 1000)}`,
    teamSize: Math.floor(Math.random() * 50) + 1,
    serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
    monthlyCost: Math.floor(Math.random() * 10000) + 100,
  },
});

export const RealTimeLog: React.FC = () => {
  const [events, setEvents] = useState<LogEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) => {
        const newEvent = generateRandomEvent();
        const updatedEvents = [newEvent, ...prevEvents.slice(0, 9)];
        return updatedEvents;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-border rounded-lg p-4 h-96 overflow-hidden">
      <h3 className="text-lg font-semibold mb-2">Real-Time Event Log</h3>
      <div className="space-y-2 overflow-y-auto h-80">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary text-secondary-foreground p-2 rounded"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{event.company}</span>
                <span className="font-mono text-xs">{event.timestamp}</span>
              </div>
              <div className="mt-1">
                <span className="font-medium">{event.eventType}</span>
                <span className="ml-2 text-sm">
                  User: {event.data.userId} | Team: {event.data.teamSize} | 
                  Service: {event.data.serviceType} | Cost: ${event.data.monthlyCost}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

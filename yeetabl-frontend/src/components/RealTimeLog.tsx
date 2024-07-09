import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LogEvent = {
  id: string;
  message: string;
  timestamp: string;
};

const generateRandomEvent = (): LogEvent => ({
  id: Math.random().toString(36).substr(2, 9),
  message: `Event ${Math.floor(Math.random() * 1000)}`,
  timestamp: new Date().toISOString(),
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
    <div className="bg-background border border-border rounded-lg p-4 h-64 overflow-hidden">
      <h3 className="text-lg font-semibold mb-2">Real-Time Event Log</h3>
      <div className="space-y-2">
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
              <span className="font-mono text-xs">{event.timestamp}</span>
              <span className="ml-2">{event.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

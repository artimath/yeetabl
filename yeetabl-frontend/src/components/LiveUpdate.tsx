import React from 'react';

const LiveUpdate: React.FC<{}> = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Live Update</h3>
      <p className="text-lg mb-4">Currently processing <span className="font-bold">1,234,567</span> events/second</p>
      <div className="h-32 bg-white dark:bg-gray-700 rounded-md p-2">
        <div className="w-full h-full flex items-end">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="bg-blue-500 dark:bg-blue-400 w-1/10 mx-px" 
              style={{height: `${Math.random() * 100}%`}}
            ></div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Last 10 minutes of ingestion</p>
    </div>
  );
};

export default LiveUpdate;

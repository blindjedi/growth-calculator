import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gray-300 h-8 w-32 mx-auto rounded"></h2>
        <p className="text-center text-xl bg-gray-300 h-6 w-40 mx-auto rounded mb-2"></p>
        <p className="text-center text-xl bg-gray-300 h-6 w-48 mx-auto rounded mb-2"></p>
        <p className="text-center text-xl bg-gray-300 h-6 w-56 mx-auto rounded mb-4"></p>
        <div className="mt-12 h-80 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

  
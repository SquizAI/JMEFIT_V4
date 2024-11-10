import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LoadingStateProps {
  type: 'card' | 'list' | 'text' | 'image';
  count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ type, count = 1 }) => {
  const renderLoadingState = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-zinc-900 p-6 rounded-lg">
            <Skeleton height={200} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
            <Skeleton width={100} />
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4">
            {Array(count).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton circle width={40} height={40} />
                <div className="flex-1">
                  <Skeleton count={2} />
                </div>
              </div>
            ))}
          </div>
        );
      case 'text':
        return <Skeleton count={count} />;
      case 'image':
        return <Skeleton height={300} />;
      default:
        return <Skeleton />;
    }
  };

  return (
    <div className="animate-pulse">
      {renderLoadingState()}
    </div>
  );
};

export default LoadingState;
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingState from './LoadingState';

interface InfiniteScrollWrapperProps {
  items: any[];
  hasMore: boolean;
  next: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  endMessage?: React.ReactNode;
}

const InfiniteScrollWrapper: React.FC<InfiniteScrollWrapperProps> = ({
  items,
  hasMore,
  next,
  children,
  loadingComponent = <LoadingState type="card" count={3} />,
  endMessage = (
    <p className="text-center text-gray-400 py-4">
      No more content to load
    </p>
  )
}) => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={next}
      hasMore={hasMore}
      loader={loadingComponent}
      endMessage={endMessage}
      className="space-y-6"
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
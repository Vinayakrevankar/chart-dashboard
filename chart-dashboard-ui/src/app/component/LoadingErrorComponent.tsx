import React from 'react';

interface LoadingErrorComponentProps {
  message: string;
  handleRetry?: () => void;
}

const LoadingErrorComponent: React.FC<LoadingErrorComponentProps> = ({ message, handleRetry }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', flexDirection: 'column' }}>
    <h2>{message}</h2>
    {handleRetry && (
      <button
        onClick={handleRetry}
        style={{ marginTop: '20px', padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Refresh
      </button>
    )}
  </div>
);

export default LoadingErrorComponent;

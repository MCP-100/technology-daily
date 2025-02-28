import React from 'react';
import AIToolsList from '../components/AIToolsList';
import { aiTools } from '../data/aiTools';

const AIToolsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AIToolsList tools={aiTools} />
      </div>
    </div>
  );
};

export default AIToolsPage; 
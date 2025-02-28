import React from 'react';

interface Tool {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  features: string[];
}

interface AIToolsListProps {
  tools: Tool[];
}

const AIToolsList: React.FC<AIToolsListProps> = ({ tools }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        AI工具前沿：七大创新解析
      </h1>
      <div className="space-y-8">
        {tools.map((tool) => (
          <div key={tool.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {tool.id}. {tool.title}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {tool.description}
            </p>
            {tool.highlights && tool.highlights.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">亮点：</h3>
                <ul className="list-disc list-inside space-y-2">
                  {tool.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-600">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tool.features && tool.features.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">特点：</h3>
                <ul className="list-disc list-inside space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolsList; 
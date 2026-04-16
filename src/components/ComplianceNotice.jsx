import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ComplianceNotice = ({ level = 'medium' }) => {
  const configs = {
    low: { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: 'ℹ️', text: 'Compliance check scheduled for next quarter.' },
    medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '⚠️', text: 'Attention: Your health data sync is 48 hours overdue.' },
    high: { color: 'bg-red-100 text-red-800 border-red-300', icon: '🚨', text: 'CRITICAL: Non-compliance detected. Local enforcement notified.' },
  };

  const config = configs[level];

  return (
    <div className={`p-4 mb-6 border-l-4 ${config.color} flex items-center gap-3 shadow-sm`}>
      <AlertTriangle className="flex-shrink-0" size={20} />
      <span className="text-sm font-medium italic">{config.text}</span>
    </div>
  );
};

export default ComplianceNotice;

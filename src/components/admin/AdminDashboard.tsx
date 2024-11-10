import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  FileText,
  Users,
  Settings,
  BarChart2,
  CheckSquare,
  TrendingUp
} from 'lucide-react';
import ContentManager from './ContentManager';
import UserManager from './UserManager';
import SettingsPanel from './SettingsPanel';
import AnalyticsDashboard from './AnalyticsDashboard';
import ContentApproval from './ContentApproval';
import UserProgressDashboard from './UserProgressDashboard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'approval', label: 'Approval', icon: CheckSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <aside className="w-64 bg-zinc-900 min-h-screen p-6">
          <div className="flex items-center gap-2 mb-8">
            <LayoutGrid className="w-6 h-6 text-[#3dd8e8]" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#3dd8e8] text-black'
                      : 'text-gray-400 hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'approval' && <ContentApproval />}
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'progress' && <UserProgressDashboard />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
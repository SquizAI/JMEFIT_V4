import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Bell, Shield, Mail } from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    siteName: 'JME FIT',
    siteDescription: 'Transform your fitness journey',
    emailNotifications: true,
    adminNotifications: true,
    maintenanceMode: false,
    registrationEnabled: true
  });

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your settings update logic here
    console.log('Settings updated:', settings);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#3dd8e8] mb-8">Site Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-zinc-900 p-6 rounded-lg space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            General Settings
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] h-24"
            />
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-400">
                Receive notifications about new user registrations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3dd8e8]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Admin Notifications</h4>
              <p className="text-sm text-gray-400">
                Receive notifications about system events
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.adminNotifications}
                onChange={(e) => handleChange('adminNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3dd8e8]"></div>
            </label>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Maintenance Mode</h4>
              <p className="text-sm text-gray-400">
                Enable maintenance mode to prevent user access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3dd8e8]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">User Registration</h4>
              <p className="text-sm text-gray-400">
                Allow new users to register
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.registrationEnabled}
                onChange={(e) => handleChange('registrationEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3dd8e8]"></div>
            </label>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-6 py-3 rounded-lg font-semibold"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </motion.button>
      </form>
    </div>
  );
};

export default SettingsPanel;
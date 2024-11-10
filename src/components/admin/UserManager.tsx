import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Shield, Ban } from 'lucide-react';

const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock data - replace with actual user data from your database
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-03-01'
    },
    {
      id: 2,
      name: 'Admin User',
      email: 'admin@jmefit.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">User Management</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <UserPlus className="w-5 h-5" />
          Add User
        </motion.button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        >
          <option value="all">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 font-medium text-gray-400">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 hover:bg-zinc-800/50"
          >
            <div className="col-span-3">{user.name}</div>
            <div className="col-span-3">{user.email}</div>
            <div className="col-span-2">
              <span className={`inline-flex items-center gap-1 ${
                user.role === 'admin' ? 'text-[#3dd8e8]' : 'text-gray-400'
              }`}>
                {user.role === 'admin' && <Shield className="w-4 h-4" />}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            <div className="col-span-2">
              <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                user.status === 'active' 
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {user.status}
              </span>
            </div>
            <div className="col-span-2 flex gap-2">
              <button className="text-[#3dd8e8] hover:text-[#34c5d3]">
                Edit
              </button>
              <button className="text-red-500 hover:text-red-400">
                <Ban className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No users found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;
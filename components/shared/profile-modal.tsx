'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User as UserIcon, Mail, Phone, Shield, Loader2, Plus, Key, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
}

export function ProfileModal({ open, onClose, userEmail }: ProfileModalProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // User creation form fields
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('User');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (open && userEmail) {
      fetchUserProfile();
    }
  }, [open, userEmail]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(userEmail)}`);
      const result = await res.json();
      if (result.success) {
        setUser(result.data);
      } else {
        toast.error(result.error || 'Failed to fetch profile details');
      }
    } catch (err) {
      toast.error('Network error. Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let pass = '';
    for (let i = 0; i < 14; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pass);
    toast.success('Generated a strong password!');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      toast.error('Name, email, and password are required');
      return;
    }

    setCreating(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          phone: newPhone.trim(),
          password: newPassword,
          role: newRole,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(`User ${newName} created successfully!`);
        // Reset form
        setNewName('');
        setNewEmail('');
        setNewPhone('');
        setNewPassword('');
        setNewRole('User');
        setShowCreateForm(false);
      } else {
        toast.error(result.error || 'Failed to create user');
      }
    } catch (err) {
      toast.error('Network error. Failed to create user.');
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-name');
    toast.success('Logged out successfully');
    onClose();
    router.push('/login');
  };

  const isRazu = userEmail.toLowerCase() === 'razu@circlenetworkbd.net';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-600" />
            <span>User Profile</span>
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            View user details and account administration actions
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs">Loading profile details...</p>
          </div>
        ) : user ? (
          <div className="space-y-6 mt-4">
            {/* User Profile Cards */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                <span className="text-xs text-slate-400 font-semibold uppercase">Name</span>
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                <span className="text-xs text-slate-400 font-semibold uppercase">Email</span>
                <span className="text-sm font-medium text-slate-700">{user.email}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                <span className="text-xs text-slate-400 font-semibold uppercase">Number</span>
                <span className="text-sm font-medium text-slate-700">{user.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold uppercase">Role</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {user.role || 'User'}
                </span>
              </div>
            </div>

            {/* Logout Action */}
            <div className="flex items-center justify-end">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl h-10 font-semibold animate-pulse hover:animate-none"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Button>
            </div>

            {/* Razu Administration (Create User Segment) */}
            {isRazu && (
              <div className="pt-4 border-t border-slate-200">
                {!showCreateForm ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(true)}
                    className="w-full flex items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl h-10 font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New User</span>
                  </Button>
                ) : (
                  <form onSubmit={handleCreateUser} className="space-y-4 bg-slate-50/50 border border-slate-200 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        New User Account
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCreateForm(false)}
                        className="text-xs text-slate-500 hover:text-slate-700 h-6 px-2"
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Input
                          placeholder="Full Name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 h-9 text-xs rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 h-9 text-xs rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <Input
                          placeholder="Phone Number (+880...)"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 h-9 text-xs rounded-lg"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-white border-slate-200 text-slate-900 placeholder-slate-400 h-9 text-xs rounded-lg flex-1"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generatePassword}
                          className="h-9 px-3 border-slate-200 hover:bg-slate-100 rounded-lg shrink-0 text-slate-600"
                          title="Generate Password"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-500 font-medium shrink-0">Role:</label>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={creating}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg h-9 text-xs flex items-center justify-center gap-1.5"
                    >
                      {creating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Register User</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">
            Could not fetch user profile details.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { User, Mail, AtSign, MessageSquare, Camera, Lock, X } from 'lucide-react';
import { Modal } from './Modal';

interface ProfilData {
  name: string;
  username: string;
  email: string;
  nickname: string;
  photo: string;
}

interface ProfilAdminProps {
  profile: ProfilData;
  setProfile: (profile: ProfilData) => void;
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export function ProfilAdmin({ profile, setProfile, showToast }: ProfilAdminProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleEditToggle = () => {
    if (isEditMode) {
      setFormData(profile);
    }
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    if (!formData.name || !formData.username || !formData.email) {
      showToast('Mohon lengkapi semua field', 'warning');
      return;
    }

    setProfile(formData);
    setIsEditMode(false);
    showToast('Profil berhasil diperbarui', 'success');
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showToast('Mohon lengkapi semua field password', 'warning');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Password baru dan konfirmasi tidak cocok', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast('Password minimal 6 karakter', 'warning');
      return;
    }

    // Mock password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsPasswordModalOpen(false);
    showToast('Password berhasil diubah', 'success');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Profil Admin</h1>
        <p className="text-gray-600">Kelola informasi profil Anda</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Profile Header */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Photo */}
            <div className="relative">
              <img
                src={formData.photo}
                alt={formData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#4C9876]"
              />
              {/* {isEditMode && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#4C9876] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#3d7a5e] transition-colors">
                  <Camera className="w-5 h-5" strokeWidth={1.5} />
                </button>
              )} */}
                {isEditMode && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const preview = URL.createObjectURL(file);
                        setFormData({ ...formData, photo: preview });
                      }
                    }}
                    className="hidden"
                    id="upload-photo"
                  />

                  <label
                    htmlFor="upload-photo"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#4C9876] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#3d7a5e] transition-colors cursor-pointer"
                  >
                    <Camera className="w-5 h-5" strokeWidth={1.5} />
                  </label>
                </>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-gray-900 mb-2">{profile.name}</h2>
              <p className="text-gray-600 mb-4">@{profile.username}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-[#4C9876]/10 text-[#4C9876] rounded-xl text-sm">
                  Administrator
                </span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-sm">
                  Aktif
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!isEditMode ? (
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2.5 bg-[#4C9876] text-white rounded-xl hover:bg-[#3d7a5e] transition-colors"
                >
                  Edit Profil
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-[#4C9876] text-white rounded-xl hover:bg-[#3d7a5e] transition-colors"
                  >
                    Simpan
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <span>Nama Lengkap</span>
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                placeholder="Masukkan nama lengkap"
              />
            ) : (
              <p className="text-gray-900 pl-7">{profile.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <AtSign className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <span>Username</span>
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                placeholder="Masukkan username"
              />
            ) : (
              <p className="text-gray-900 pl-7">{profile.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Mail className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <span>Email</span>
            </label>
            {isEditMode ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                placeholder="Masukkan email"
              />
            ) : (
              <p className="text-gray-900 pl-7">{profile.email}</p>
            )}
          </div>

          {/* Nickname */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <MessageSquare className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <span>Nickname</span>
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                placeholder="Masukkan nickname"
              />
            ) : (
              <p className="text-gray-900 pl-7">{profile.nickname}</p>
            )}
          </div>

          {/* Change Password */}
          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center gap-2 text-[#4C9876] hover:text-[#3d7a5e] transition-colors"
            >
              <Lock className="w-5 h-5" strokeWidth={1.5} />
              <span>Ubah Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <Modal onClose={() => setIsPasswordModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Ubah Password</h2>
              <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Password Saat Ini</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="Masukkan password saat ini"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password Baru</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="Masukkan password baru"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="Konfirmasi password baru"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-6 py-2.5 bg-[#4C9876] text-white rounded-xl hover:bg-[#3d7a5e] transition-colors"
              >
                Ubah Password
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

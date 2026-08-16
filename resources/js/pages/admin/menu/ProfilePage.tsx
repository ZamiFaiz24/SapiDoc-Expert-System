'use client';

import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  Lock, 
  Shield, 
  Info, 
  Settings, 
  RefreshCw, 
  CheckCircle,
  Edit2
} from 'lucide-react';

interface ProfilePageProps {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
}

export default function ProfilePage({ auth }: ProfilePageProps) {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profil');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Form Profile
  const profileForm = useForm({
    name: auth.user.name,
    email: auth.user.email,
  });

  // Form Password
  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    profileForm.patch(route('profile.update'), {
        preserveScroll: true,
        onSuccess: () => {
            setIsEditingProfile(false);
        },
    });
};

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    passwordForm.put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        passwordForm.reset();
        setIsChangingPassword(false);
      },
    });
  };

  const menuItems = [
    { id: 'profil', label: 'Profil', icon: User, type: 'button' },
    { id: 'logout', label: 'Logout', icon: LogOut, type: 'link', href: route('logout'), method: 'post' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Head title="Profile Administrator" />

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 md:translate-x-0 shadow-lg md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding Sidebar */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-400 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/images/logo.png"
              alt="SapiDoc Logo"
              className="h-14 w-14 rounded-full shadow-sm object-cover bg-white"
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">SapiDoc</h1>
              <p className="text-xs text-emerald-100">Sistem Pakar Penyakit Sapi</p>
            </div>
          </div>
        </div>

        {/* Navigasi Sidebar */}
        <nav className="mt-6 flex h-[calc(100%-140px)] flex-col px-4">

          {/* Tombol Kembali */}
          <div className="mb-5">
            <Link
              href={route('dashboard')}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            >
              ← Kembali ke Dashboard
            </Link>
          </div>

          {/* Daftar Menu */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              const baseClass = `
                flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all
                ${
                  isActive
                    ? 'border-l-4 border-emerald-600 bg-emerald-50 font-semibold text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                }
              `;

              if (item.type === 'button') {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={baseClass}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  method={(item.method as any) || 'get'}
                  as="button"
                  className={baseClass}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              Administrator
            </p>
            <p className="text-xs text-gray-500">
              Sistem Pakar CF
            </p>
          </div>

        </nav>
      </div>

      {/* Overlay Background mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 md:ml-64 p-6 md:p-8 pt-20 md:pt-8 transition-all duration-300">
        
        {/* Header Halaman */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Administrator</h1>
          <p className="text-sm text-gray-500">Kelola informasi akun dan pengaturan keamanan sistem.</p>
        </div>

        {/* Grid Layout Konten */}
        <div className="grid gap-6 md:grid-cols-2 lg:items-start">
          
          {/* SISI KIRI KONTEN: PROFIL AKUN & INFO SISTEM */}
          <div className="space-y-6">
            
            {/* Card: Informasi Profil */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition-all">
              {/* Header Card */}
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Profil Akun</h3>
                    <p className="text-xs text-gray-400">Detail data login administrator</p>
                  </div>
                </div>

                {/* Tombol Edit di pojok kanan atas card (Hanya muncul jika sedang TIDAK mengedit) */}
                {!isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200"
                  >
                    <Edit2 size={14} /> Edit Profil
                  </button>
                )}
              </div>

              {/* Konten Utama Card */}
              {!isEditingProfile ? (
                // TAMPILAN READ-ONLY (DEFAULT)
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Nama Lengkap</label>
                    <p className="mt-1 font-medium text-gray-800">{auth.user.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Alamat Email</label>
                    <p className="mt-1 font-medium text-gray-800">{auth.user.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Hak Akses</label>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        <Shield size={12} /> Administrator
                      </span>
                    </div>
                  </div>

                  {/* Notifikasi Sukses Simpan */}
                  {profileForm.recentlySuccessful && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 animate-fade-in">
                      <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>Profil berhasil diperbarui!</span>
                    </div>
                  )}
                </div>
              ) : (
                // TAMPILAN MODE EDIT FORM
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <input
                      type="text"
                      value={profileForm.data.name}
                      onChange={(e) => profileForm.setData('name', e.target.value)}
                      className="mt-1 block w-full rounded-2xl border-gray-200 bg-gray-50/50 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white transition"
                      required
                    />
                    {profileForm.errors.name && <p className="mt-1 text-xs text-red-600">{profileForm.errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Alamat Email</label>
                    <input
                      type="email"
                      value={profileForm.data.email}
                      onChange={(e) => profileForm.setData('email', e.target.value)}
                      className="mt-1 block w-full rounded-2xl border-gray-200 bg-gray-50/50 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white transition"
                      required
                    />
                    {profileForm.errors.email && <p className="mt-1 text-xs text-red-600">{profileForm.errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Hak Akses</label>
                    <div className="mt-1 opacity-60 cursor-not-allowed">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200">
                        <Shield size={12} /> Administrator (Tidak dapat diubah)
                      </span>
                    </div>
                  </div>

                  {/* Tombol Aksi Form */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={profileForm.processing}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {profileForm.processing ? <RefreshCw className="animate-spin" size={16} /> : null}
                      Simpan Perubahan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        profileForm.reset();
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Card: Informasi Sistem */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="rounded-2xl bg-blue-100 p-2 text-blue-600">
                  <Info size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Informasi Sistem</h3>
                  <p className="text-xs text-gray-400">Spesifikasi aplikasi yang berjalan</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-gray-500">Nama Sistem</span>
                  <span className="font-semibold text-gray-800">SapiDoc - Sistem Pakar</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-gray-500">Versi Aplikasi</span>
                  <span className="font-semibold text-gray-800">Version 1.0</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-gray-500">Metode Inferensi</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg text-xs">
                    Forward Chaining & Certainty Factor
                  </span>
                </div>
              </div>
            </div>
          </div>

         {/* SISI KANAN KONTEN: KEAMANAN / UBAH PASSWORD */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl transition-all">
            {/* Header Card */}
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-2 text-amber-600">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Keamanan</h3>
                  <p className="text-xs text-gray-400">Perbarui kata sandi akun secara berkala</p>
                </div>
              </div>

              {/* Tombol Aksi di pojok kanan atas card (Hanya muncul jika sedang TIDAK mengedit) */}
              {!isChangingPassword && (
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200"
                >
                  <Settings size={14} /> Ubah Password
                </button>
              )}
            </div>

            {/* Konten Utama Card */}
            {!isChangingPassword ? (
              // TAMPILAN READ-ONLY (DEFAULT)
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Kata Sandi</label>
                  <p className="mt-1 font-mono text-gray-500 text-lg">••••••••</p>
                </div>

                {/* Notifikasi Sukses Simpan */}
                {passwordForm.recentlySuccessful && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 animate-fade-in">
                    <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Password berhasil diperbarui dengan aman!</span>
                  </div>
                )}
              </div>
            ) : (
              // TAMPILAN MODE EDIT FORM
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password Saat Ini</label>
                  <input
                    type="password"
                    value={passwordForm.data.current_password}
                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                    className="mt-1 block w-full rounded-2xl border-gray-200 bg-gray-50/50 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                  {passwordForm.errors.current_password && <p className="mt-1 text-xs text-red-600">{passwordForm.errors.current_password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password Baru</label>
                  <input
                    type="password"
                    value={passwordForm.data.password}
                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                    className="mt-1 block w-full rounded-2xl border-gray-200 bg-gray-50/50 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                  {passwordForm.errors.password && <p className="mt-1 text-xs text-red-600">{passwordForm.errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    value={passwordForm.data.password_confirmation}
                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                    className="mt-1 block w-full rounded-2xl border-gray-200 bg-gray-50/50 p-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                  {passwordForm.errors.password_confirmation && <p className="mt-1 text-xs text-red-600">{passwordForm.errors.password_confirmation}</p>}
                </div>

                {/* Tombol Aksi Form */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={passwordForm.processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {passwordForm.processing ? <RefreshCw className="animate-spin" size={16} /> : null}
                    Simpan Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      passwordForm.reset();
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
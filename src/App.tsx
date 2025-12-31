import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { DashboardKonsumen } from './components/DashboardKonsumen';
import { DashboardAdmin } from './components/DashboardAdmin';
import { Anggota } from './components/Anggota';
import { Keuangan } from './components/Keuangan';
import { PembakaranSampah } from './components/PembakaranSampah';
import { ManajemenTobong } from './components/ManajemenTobong';
import { LaporanPembakaran } from './components/LaporanPembakaran';
import { ProfilAdmin } from './components/ProfilAdmin';
import { TentangEcoBurn } from './components/TentangEcoBurn';
import { LoginPage } from './components/LoginPage';
// import { RegisterPage } from './components/RegisterPage';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin EcoBurn',
    username: 'admin',
    email: 'admin@ecoburn.id',
    nickname: 'Eco',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // FUNGSI INI MENGGANTIKAN handleLogin MOCK yang lama.
  // Dipanggil OLEH LoginPage setelah API Login berhasil menyimpan token.
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard-admin');
    showToast('Login berhasil! Selamat datang di EcoBurn', 'success');
  };

  const handleLogout = () => {
    // Tambahkan penghapusan token saat logout
    localStorage.removeItem('access_token');
    
    setIsLoggedIn(false);
    setCurrentPage('home');
    setIsSidebarOpen(false);
    showToast('Logout berhasil', 'success');
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  // const renderPage = () => {
  //   // Jika belum login, selalu tampilkan halaman Login
  //   if (!isLoggedIn) {
  //       return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  //   }
    
  //   switch (currentPage) {
  //     case 'home':
  //       return <DashboardKonsumen />;
  //     case 'tentang':
  //       return <TentangEcoBurn />;
  //     // Case 'login' sudah tidak perlu, karena logic ada di atas (if (!isLoggedIn))
  //     case 'dashboard-admin':
  //       return <DashboardAdmin />;
  //     case 'anggota':
  //       return <Anggota showToast={showToast} />;
  //     case 'keuangan':
  //       return <Keuangan showToast={showToast} />;
  //     case 'pembakaran':
  //       return <PembakaranSampah showToast={showToast} />;
  //     case 'tobong':
  //       return <ManajemenTobong showToast={showToast} />;
  //     case 'laporan':
  //       return <LaporanPembakaran />;
  //     case 'profil':
  //       return <ProfilAdmin profile={adminProfile} setProfile={setAdminProfile} showToast={showToast} />;
  //     default:
  //       return <DashboardAdmin />; // Default ke dashboard admin jika sudah login
  //   }
  // };

  const renderPage = () => {
    // HALAMAN PUBLIK (BOLEH DIAKSES TANPA LOGIN)
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'home':
          return <DashboardKonsumen />;
        case 'tentang':
          return <TentangEcoBurn />;
        case 'login':
          return (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              // onNavigate={navigateTo}
            />  
          );
        // case 'register':
        //   return <RegisterPage onNavigate={navigateTo} />;
        default:
          return <DashboardKonsumen />;
      }
    }

    // HALAMAN ADMIN (BUTUH LOGIN)
    switch (currentPage) {
      case 'dashboard-admin':
        return <DashboardAdmin />;
      case 'anggota':
        return <Anggota showToast={showToast} />;
      case 'keuangan':
        return <Keuangan showToast={showToast} />;
      case 'pembakaran':
        return <PembakaranSampah showToast={showToast} />;
      case 'tobong':
        return <ManajemenTobong showToast={showToast} />;
      case 'laporan':
        return <LaporanPembakaran />;
      case 'profil':
        return <ProfilAdmin profile={adminProfile} setProfile={setAdminProfile} showToast={showToast} />;
      default:
        return <DashboardAdmin />;
    }
  };


  // Cek status login saat awal render (misalnya dari token di localStorage)
  // Anda bisa menambahkan logic di sini jika ingin persistensi status login
  /*
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
        setIsLoggedIn(true);
        setCurrentPage('dashboard-admin');
    }
  }, []);
  */

  return (
    <div className="min-h-screen bg-[#F4F8F5]">
      <Header 
        isLoggedIn={isLoggedIn}
        adminProfile={adminProfile}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onProfileClick={() => navigateTo('profil')}
      />
      
      <Sidebar
        isOpen={isSidebarOpen}
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onLogout={handleLogout}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={`transition-all duration-300 lg:ml-64 ${isSidebarOpen ? '' : ''}`}>
        <div className="pt-16">
          {renderPage()}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
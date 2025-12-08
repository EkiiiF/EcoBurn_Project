import { X, Home, Info, LogIn, LayoutDashboard, Users, Wallet, Flame, Factory, FileText, User, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export function Sidebar({ isOpen, isLoggedIn, currentPage, onNavigate, onLogout, onClose }: SidebarProps) {
  const konsumenMenu = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tentang', label: 'Tentang EcoBurn', icon: Info },
    { id: 'login', label: 'Login', icon: LogIn },
  ];

  const adminMenu = [
    { id: 'dashboard-admin', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'anggota', label: 'Anggota', icon: Users },
    { id: 'keuangan', label: 'Keuangan', icon: Wallet },
    { id: 'pembakaran', label: 'Pembakaran Sampah', icon: Flame },
    { id: 'tobong', label: 'Manajemen Tobong', icon: Factory },
    { id: 'laporan', label: 'Laporan Pembakaran', icon: FileText },
    { id: 'profil', label: 'Profil Admin', icon: User },
  ];

  const menuItems = isLoggedIn ? adminMenu : konsumenMenu;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[2px] bg-black/10 z-40 lg:hidden"
          onClick={onClose}
        />
      )}


      {/* Overlay hanya tampil di mobile */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 block lg:hidden"
          onClick={onClose}
        />
      )} */}


      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            <span className="text-gray-800">Menu</span>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#4C9876] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Logout Button */}
          {isLoggedIn && (
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

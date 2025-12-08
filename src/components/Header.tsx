import { Menu } from 'lucide-react';
// import ecoBurnLogo from 'figma:asset/faff261b4e53cd97877e5dd0f628f0a726ae67c0.png';
import ecoBurnLogo from '../assets/EcoBurn_Logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  adminProfile: { name: string; photo: string };
  onMenuClick: () => void;
  onProfileClick: () => void;
}

export function Header({ isLoggedIn, adminProfile, onMenuClick, onProfileClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 border-b border-gray-100">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-3">
            <img src={ecoBurnLogo} alt="EcoBurn" className="w-10 h-10" />
            <span className="text-gray-800 tracking-tight">EcoBurn</span>
          </div>
        </div>

        {isLoggedIn && (
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-colors"
          >
            <img
              src={adminProfile.photo}
              alt={adminProfile.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-[#4C9876]"
            />
          </button>
        )}
      </div>
    </header>
  );
}

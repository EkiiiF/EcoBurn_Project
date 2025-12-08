import { useState } from 'react';
import { Lock, User, LogIn, Eye, EyeOff } from 'lucide-react';
// import ecoBurnLogo from 'figma:asset/faff261b4e53cd97877e5dd0f628f0a726ae67c0.png';
import ecoBurnLogo from '../assets/EcoBurn_Logo.png';

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={ecoBurnLogo} alt="EcoBurn" className="w-20 h-20" />
            </div>
            <h2 className="text-gray-900 mb-2">Login Admin</h2>
            <p className="text-gray-600">Masuk ke dashboard EcoBurn</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876] focus:border-transparent"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <input
                  // type="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876] focus:border-transparent"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4C9876] text-white py-3 rounded-xl hover:bg-[#3d7a5e] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" strokeWidth={1.5} />
              <span>Login</span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[#F4F8F5] rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Demo Login:</p>
            <p className="text-sm text-gray-700">
              Username: <strong>admin</strong>
            </p>
            <p className="text-sm text-gray-700">
              Password: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

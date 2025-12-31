import { useState } from 'react';
import { Lock, User, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import ecoBurnLogo from '../assets/EcoBurn_Logo.png';
// import { Link } from 'react-router-dom';
// Import client HTTP
import axios from 'axios'; 
// Asumsi API Anda berjalan di http://localhost:8000/api
const API_URL = 'http://localhost:8000/api'; 


// Hapus interface, kita akan memanggil fungsi login di sini, bukan di App.tsx
// interface LoginPageProps { onLogin: (username: string, password: string) => boolean; }

// Ubah prop component, asumsikan kita akan menerima fungsi penanganan sukses dari App.tsx
interface LoginPageProps {
  onLoginSuccess: () => void;
  // onNavigate: (page: string) => void;
}

// export function LoginPage({ onLoginSuccess,  onNavigate}: LoginPageProps) {
export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Fungsi Login Asinkron ---
  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // PERHATIAN: Laravel menggunakan 'email' sebagai kredensial, bukan 'username'.
    // Kita kirim 'email' dan 'password' ke endpoint /login.
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: username, 
        password: password,
      });

      const { access_token } = response.data;
      
      // 1. Simpan token ke Local Storage
      localStorage.setItem('access_token', access_token);
      
      // 2. Beri tahu App component bahwa login berhasil
      onLoginSuccess(); 

    } catch (err: any) {
      // 3. Tangani Error dari backend (misal 401 Unauthorized)
      let errorMessage = 'Gagal login. Silakan coba lagi.';
      if (err.response && err.response.status === 401) {
        errorMessage = 'Email atau Password salah.';
      }
      setError(errorMessage);
      console.error("Login Error:", err);

    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={ecoBurnLogo} alt="EcoBurn" className="w-20 h-20" />
            </div>
            <h2 className="text-gray-900 mb-2">Login Admin</h2>
            <p className="text-gray-600">Masuk ke dashboard EcoBurn</p>
          </div>

          {/* Display Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... (Input Username) ... */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <input
                  type="text"
                  value={username} // Menggunakan Email sebagai input
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876] focus:border-transparent"
                  placeholder="Masukkan email"
                  required
                />
              </div>
            </div>
            {/* ... (Input Password) ... */}
            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
                <input
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
                  disabled={isLoading}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
              ) : (
                <LogIn className="w-5 h-5" strokeWidth={1.5} />
              )}
              <span>{isLoading ? 'Memproses...' : 'Login'}</span>
            </button>
          </form>
          {/* ... (Demo Credentials) ... */}
          {/* <div className="mt-6 text-center"> */}
            {/* <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3BAA5C] hover:underline">
                Register here
              </Link>
            </p> */}
            {/* <p className="text-gray-600">
              Don't have an account?{' '}
              <span
                onClick={() => onNavigate('register')}
                className="text-[#3BAA5C] hover:underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
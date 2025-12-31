import React, { useState, useEffect } from 'react';
import { Leaf, Flame, Users, TrendingUp, Recycle, Wind, Droplets } from 'lucide-react';
import axios from 'axios';

export function DashboardKonsumen() {
  const [loading, setLoading] = useState(true);
  
  // Default values
  const [statsData, setStatsData] = useState({
    totalSampah: '0 Kg',
    penggunaAktif: '0',
    tobongAktif: '0',
    penguranganEmisi: '98%'
  });

  // --- FETCH DATA PUBLIK (TANPA LOGIN) ---
  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        // Panggil endpoint publik yang baru kita buat
        // Tidak perlu header Authorization/Token
        const response = await axios.get('http://127.0.0.1:8000/api/public/stats');

        if (response.data.status === 'success') {
            const data = response.data.data;
            setStatsData({
                totalSampah: data.total_sampah,
                penggunaAktif: data.pengguna_aktif,
                tobongAktif: data.tobong_aktif,
                penguranganEmisi: data.pengurangan_emisi
            });
        }
      } catch (error) {
        console.error("Gagal mengambil data publik:", error);
        // Jika error, data tetap menggunakan default '0' agar tampilan tidak rusak
      } finally {
        setLoading(false);
      }
    };

    fetchPublicStats();
  }, []);

  const stats = [
    { label: 'Total Sampah Dibakar', value: statsData.totalSampah, icon: Flame, color: 'bg-orange-100 text-orange-600' },
    { label: 'Pengguna Aktif', value: statsData.penggunaAktif, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Tobong Aktif', value: statsData.tobongAktif, icon: Wind, color: 'bg-green-100 text-green-600' },
    { label: 'Pengurangan Emisi', value: statsData.penguranganEmisi, icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ];

  const benefits = [
    {
      title: 'Teknologi Pengurang Asap',
      description: 'Sistem tobong asap mengurangi polusi udara hingga 98% dibanding pembakaran konvensional',
      icon: Wind,
    },
    {
      title: 'Ramah Lingkungan',
      description: 'Mengubah sampah menjadi abu yang dapat dimanfaatkan sebagai pupuk organik',
      icon: Leaf,
    },
    {
      title: 'Efisien & Ekonomis',
      description: 'Mengurangi volume sampah hingga 90% dengan biaya terjangkau',
      icon: Recycle,
    },
    {
      title: 'Mengurangi Pencemaran',
      description: 'Proses pembakaran terkontrol mengurangi dampak negatif terhadap lingkungan',
      icon: Droplets,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4C9876] to-[#3d7a5e] rounded-xl p-6 md:p-8 lg:p-12 mb-6 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-8 h-8" />
            <span className="text-white/90">Selamat Datang di</span>
          </div>
          <h1 className="text-white mb-4 text-3xl font-bold">EcoBurn</h1>
          <p className="text-white/90 text-lg mb-6">
            Platform Pengelolaan Pembakaran Sampah Ramah Lingkungan dengan Teknologi Tobong Asap
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-white font-medium">✓ Mengurangi Polusi</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-white font-medium">✓ Hemat Biaya</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-white font-medium">✓ Mudah Digunakan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
              {loading ? (
                 <div className="h-7 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                 <div className="text-gray-900 font-bold text-xl">{stat.value}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edukasi Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2 font-bold text-xl">Mengapa EcoBurn?</h2>
          <p className="text-gray-600">Solusi pembakaran sampah yang aman, bersih, dan bertanggung jawab</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-[#4C9876] transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4C9876]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#4C9876] transition-colors">
                    <Icon className="w-6 h-6 text-[#4C9876] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4 font-bold text-xl">Tentang Sistem EcoBurn</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            EcoBurn adalah platform inovatif yang mengelola pembakaran sampah menggunakan teknologi <strong>Tobong Asap</strong> - 
            sebuah sistem pembakar modern yang dirancang khusus untuk mengurangi emisi asap dan polutan hingga 98%.
          </p>
          <p>
            Dengan EcoBurn, masyarakat dapat mengelola sampah dengan cara yang:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 marker:text-[#4C9876]">
            <li>Ramah lingkungan dengan emisi minimal</li>
            <li>Efisien dalam mengurangi volume sampah</li>
            <li>Menghasilkan abu yang dapat dimanfaatkan sebagai pupuk</li>
            <li>Terpantau dan terkelola dengan baik</li>
          </ul>
          <div className="mt-6 p-4 bg-[#F4F8F5] rounded-xl border border-[#4C9876]/20">
            <p className="text-[#4C9876]">
              <strong>Bergabunglah dengan EcoBurn</strong> dan jadilah bagian dari solusi pengelolaan sampah yang berkelanjutan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
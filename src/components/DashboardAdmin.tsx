import { Users, Flame, Wallet, Factory, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DashboardAdmin() {
  const statsCards = [
    { label: 'Total Anggota', value: '324', change: '+12%', icon: Users, color: 'bg-blue-100 text-blue-600', trend: 'up' },
    { label: 'Total Pembakaran', value: '1,248', change: '+8%', icon: Flame, color: 'bg-orange-100 text-orange-600', trend: 'up' },
    { label: 'Keuangan Masuk', value: 'Rp 45.6 Juta', change: '+15%', icon: Wallet, color: 'bg-green-100 text-green-600', trend: 'up' },
    { label: 'Tobong Aktif', value: '8/10', change: '-1', icon: Factory, color: 'bg-purple-100 text-purple-600', trend: 'down' },
  ];

  const growthData = [
    { bulan: 'Jan', anggota: 245 },
    { bulan: 'Feb', anggota: 268 },
    { bulan: 'Mar', anggota: 285 },
    { bulan: 'Apr', anggota: 298 },
    { bulan: 'Mei', anggota: 310 },
    { bulan: 'Jun', anggota: 324 },
  ];

  const statusData = [
    { name: 'Selesai', value: 720, color: '#4C9876' },
    { name: 'Proses', value: 145, color: '#FFA500' },
    { name: 'Pending', value: 98, color: '#FFD700' },
    { name: 'Dibatalkan', value: 45, color: '#DC2626' },
  ];

  const financialData = [
    { bulan: 'Jan', pendaftaran: 4200000, perpanjang: 6800000 },
    { bulan: 'Feb', pendaftaran: 3800000, perpanjang: 7200000 },
    { bulan: 'Mar', pendaftaran: 4500000, perpanjang: 6900000 },
    { bulan: 'Apr', pendaftaran: 5100000, perpanjang: 7500000 },
    { bulan: 'Mei', pendaftaran: 4800000, perpanjang: 8200000 },
    { bulan: 'Jun', pendaftaran: 5200000, perpanjang: 8600000 },
  ];

  const recentActivities = [
    { type: 'user', message: 'Anggota baru terdaftar: Ahmad Rizki', time: '5 menit lalu' },
    { type: 'burn', message: 'Pembakaran selesai: Tobong A - 45 Kg', time: '15 menit lalu' },
    { type: 'payment', message: 'Pembayaran diterima: Rp 150.000', time: '1 jam lalu' },
    { type: 'tobong', message: 'Tobong C dalam maintenance', time: '2 jam lalu' },
    { type: 'burn', message: 'Pembakaran dimulai: Tobong B - 30 Kg', time: '3 jam lalu' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan sistem EcoBurn hari ini</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
              <div className="text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Pertumbuhan Anggota</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bulan" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="anggota" stroke="#4C9876" strokeWidth={2} dot={{ fill: '#4C9876', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Status Pembakaran</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-gray-900 mb-4">Statistik Finansial</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="bulan" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`} />
            <Legend />
            <Bar dataKey="pendaftaran" fill="#4C9876" name="Pendaftaran" radius={[8, 8, 0, 0]} />
            <Bar dataKey="perpanjang" fill="#8BC34A" name="Perpanjang" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#4C9876]" strokeWidth={1.5} />
          <h3 className="text-gray-900">Aktivitas Terakhir</h3>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-[#4C9876] mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-700">{activity.message}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

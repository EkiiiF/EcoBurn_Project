import { useState } from 'react';
import { Search, Plus, Calendar, Download, X } from 'lucide-react';
import { Modal } from './Modal';

interface TransaksiData {
  id: number;
  tanggal: string;
  sumber: 'pendaftaran' | 'perpanjang';
  nama: string;
  telepon: string;
  email: string;
  alamat: string;
  jumlah: number;
  status: 'aktif' | 'masa tenggang' | 'nonaktif';
}

interface KeuanganProps {
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export function Keuangan({ showToast }: KeuanganProps) {
  const [transaksiList, setTransaksiList] = useState<TransaksiData[]>([
    { id: 1, tanggal: '2024-12-01', sumber: 'pendaftaran', nama: 'Ahmad Rizki', telepon: '081234567890', email: 'ahmad@email.com', alamat: 'Jl. Merdeka No. 12', jumlah: 150000, status: 'aktif' },
    { id: 2, tanggal: '2024-12-02', sumber: 'perpanjang', nama: 'Siti Nurhaliza', telepon: '081234567891', email: 'siti@email.com', alamat: 'Jl. Sudirman No. 45', jumlah: 100000, status: 'aktif' },
    { id: 3, tanggal: '2024-12-03', sumber: 'pendaftaran', nama: 'Budi Santoso', telepon: '081234567892', email: 'budi@email.com', alamat: 'Jl. Gatot Subroto No. 78', jumlah: 150000, status: 'masa tenggang' },
    { id: 4, tanggal: '2024-12-05', sumber: 'perpanjang', nama: 'Dewi Lestari', telepon: '081234567893', email: 'dewi@email.com', alamat: 'Jl. Ahmad Yani No. 23', jumlah: 100000, status: 'aktif' },
    { id: 5, tanggal: '2024-12-07', sumber: 'perpanjang', nama: 'Eko Prasetyo', telepon: '081234567894', email: 'eko@email.com', alamat: 'Jl. Diponegoro No. 56', jumlah: 100000, status: 'aktif' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSumber, setFilterSumber] = useState<string>('semua');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    alamat: '',
    jumlah: '',
    status: 'aktif' as 'aktif' | 'masa tenggang' | 'nonaktif',
  });

  const filteredTransaksi = transaksiList.filter(transaksi => {
    const matchesSearch = transaksi.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaksi.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterSumber === 'semua' || transaksi.sumber === filterSumber;
    const matchesDateFrom = !dateFrom || transaksi.tanggal >= dateFrom;
    const matchesDateTo = !dateTo || transaksi.tanggal <= dateTo;
    return matchesSearch && matchesFilter && matchesDateFrom && matchesDateTo;
  });

  const totalPemasukan = filteredTransaksi.reduce((sum, t) => sum + t.jumlah, 0);

  const handleAdd = () => {
    setFormData({ nama: '', telepon: '', email: '', alamat: '', jumlah: '', status: 'aktif' });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const newTransaksi: TransaksiData = {
      id: Math.max(...transaksiList.map(t => t.id)) + 1,
      tanggal: new Date().toISOString().split('T')[0],
      sumber: 'perpanjang',
      nama: formData.nama,
      telepon: formData.telepon,
      email: formData.email,
      alamat: formData.alamat,
      jumlah: Number(formData.jumlah),
      status: formData.status,
    };
    setTransaksiList([newTransaksi, ...transaksiList]);
    setIsModalOpen(false);
    showToast('Transaksi berhasil ditambahkan', 'success');
  };

  const handleExport = () => {
    showToast('Data berhasil diekspor', 'success');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Manajemen Keuangan</h1>
        <p className="text-gray-600">Kelola transaksi dan pemasukan EcoBurn</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-[#4C9876] to-[#3d7a5e] rounded-xl p-6 mb-6 text-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Pemasukan</p>
            <p className="text-white">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Total Transaksi</p>
            <p className="text-white">{filteredTransaksi.length}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Rata-rata Transaksi</p>
            <p className="text-white">
              Rp {filteredTransaksi.length > 0 ? Math.round(totalPemasukan / filteredTransaksi.length).toLocaleString('id-ID') : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
            />
          </div>

          {/* Date From */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
            />
          </div>

          {/* Date To */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
            />
          </div>

          {/* Filter Sumber */}
          <div>
            <select
              value={filterSumber}
              onChange={(e) => setFilterSumber(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
            >
              <option value="semua">Semua Sumber</option>
              <option value="pendaftaran">Pendaftaran</option>
              <option value="perpanjang">Perpanjang</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAdd}
            className="bg-[#4C9876] text-white px-4 py-2.5 rounded-xl hover:bg-[#3d7a5e] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            <span>Tambah Transaksi</span>
          </button>
          <button
            onClick={handleExport}
            className="border border-[#4C9876] text-[#4C9876] px-4 py-2.5 rounded-xl hover:bg-[#4C9876] hover:text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Tanggal</th>
                <th className="px-6 py-4 text-left text-gray-700">Sumber</th>
                <th className="px-6 py-4 text-left text-gray-700">Nama</th>
                <th className="px-6 py-4 text-left text-gray-700">Telepon</th>
                <th className="px-6 py-4 text-left text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-gray-700">Alamat</th>
                <th className="px-6 py-4 text-left text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-gray-700">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransaksi.map((transaksi) => (
                <tr key={transaksi.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{new Date(transaksi.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaksi.sumber === 'pendaftaran' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {transaksi.sumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{transaksi.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{transaksi.telepon}</td>
                  <td className="px-6 py-4 text-gray-600">{transaksi.email}</td>
                  <td className="px-6 py-4 text-gray-600">{transaksi.alamat}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaksi.status === 'aktif' ? 'bg-green-100 text-green-700' :
                      transaksi.status === 'masa tenggang' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaksi.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">Rp {transaksi.jumlah.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransaksi.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada data transaksi ditemukan
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Tambah Transaksi Perpanjang</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nama Anggota</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="Masukkan nama anggota"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Telepon</label>
                <input
                  type="tel"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="081234567890"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Alamat</label>
                <textarea
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="Masukkan alamat"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Jumlah Pembayaran (Rp)</label>
                <input
                  type="number"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                  placeholder="100000"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status Anggota</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                >
                  <option value="aktif">Aktif</option>
                  <option value="masa tenggang">Masa Tenggang</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#4C9876] text-white rounded-xl hover:bg-[#3d7a5e] transition-colors"
              >
                Tambah Transaksi
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

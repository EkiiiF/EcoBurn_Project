import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X, Filter } from 'lucide-react';
import { Modal } from './Modal';

interface AnggotaData {
  id: number;
  nama: string;
  telepon: string;
  email: string;
  alamat: string;
  totalSampah: number;
  status: 'aktif' | 'masa tenggang' | 'nonaktif';
  pembayaran: 'lunas' | 'pending';
}

interface AnggotaProps {
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export function Anggota({ showToast }: AnggotaProps) {
  const [anggotaList, setAnggotaList] = useState<AnggotaData[]>([
    { id: 1, nama: 'Ahmad Rizki', telepon: '081234567890', email: 'ahmad@email.com', alamat: 'Jl. Merdeka No. 12', totalSampah: 125, status: 'aktif', pembayaran: 'lunas' },
    { id: 2, nama: 'Siti Nurhaliza', telepon: '081234567891', email: 'siti@email.com', alamat: 'Jl. Sudirman No. 45', totalSampah: 98, status: 'aktif', pembayaran: 'lunas' },
    { id: 3, nama: 'Budi Santoso', telepon: '081234567892', email: 'budi@email.com', alamat: 'Jl. Gatot Subroto No. 78', totalSampah: 156, status: 'masa tenggang', pembayaran: 'pending' },
    { id: 4, nama: 'Dewi Lestari', telepon: '081234567893', email: 'dewi@email.com', alamat: 'Jl. Ahmad Yani No. 23', totalSampah: 67, status: 'aktif', pembayaran: 'lunas' },
    { id: 5, nama: 'Eko Prasetyo', telepon: '081234567894', email: 'eko@email.com', alamat: 'Jl. Diponegoro No. 56', totalSampah: 45, status: 'nonaktif', pembayaran: 'pending' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'detail'>('add');
  const [selectedAnggota, setSelectedAnggota] = useState<AnggotaData | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    alamat: '',
    status: 'aktif' as 'aktif' | 'masa tenggang' | 'nonaktif',
    pembayaran: 'lunas' as 'lunas' | 'pending',
  });

  const filteredAnggota = anggotaList.filter(anggota => {
    const matchesSearch = anggota.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         anggota.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         anggota.telepon.includes(searchQuery);
    const matchesFilter = filterStatus === 'semua' || anggota.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ nama: '', telepon: '', email: '', alamat: '', status: 'aktif', pembayaran: 'lunas' });
    setIsModalOpen(true);
  };

  const handleEdit = (anggota: AnggotaData) => {
    setModalMode('edit');
    setSelectedAnggota(anggota);
    setFormData({
      nama: anggota.nama,
      telepon: anggota.telepon,
      email: anggota.email,
      alamat: anggota.alamat,
      status: anggota.status,
      pembayaran: anggota.pembayaran,
    });
    setIsModalOpen(true);
  };

  const handleDetail = (anggota: AnggotaData) => {
    setModalMode('detail');
    setSelectedAnggota(anggota);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      setAnggotaList(anggotaList.filter(a => a.id !== id));
      showToast('Anggota berhasil dihapus', 'success');
    }
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newAnggota: AnggotaData = {
        id: Math.max(...anggotaList.map(a => a.id)) + 1,
        ...formData,
        totalSampah: 0,
      };
      setAnggotaList([...anggotaList, newAnggota]);
      showToast('Anggota berhasil ditambahkan', 'success');
    } else if (modalMode === 'edit' && selectedAnggota) {
      setAnggotaList(anggotaList.map(a => 
        a.id === selectedAnggota.id ? { ...a, ...formData } : a
      ));
      showToast('Data anggota berhasil diperbarui', 'success');
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      aktif: 'bg-green-100 text-green-700',
      'masa tenggang': 'bg-yellow-100 text-yellow-700',
      nonaktif: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Manajemen Anggota</h1>
        <p className="text-gray-600">Kelola data anggota EcoBurn</p>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Cari nama, email, atau telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876] focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-11 pr-8 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876] appearance-none bg-white"
            >
              <option value="semua">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="masa tenggang">Masa Tenggang</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-[#4C9876] text-white px-4 py-2.5 rounded-xl hover:bg-[#3d7a5e] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            <span>Tambah Anggota</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Nama</th>
                <th className="px-6 py-4 text-left text-gray-700">Telepon</th>
                <th className="px-6 py-4 text-left text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-gray-700">Alamat</th>
                <th className="px-6 py-4 text-left text-gray-700">Total Sampah</th>
                <th className="px-6 py-4 text-left text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-gray-700">Pembayaran</th>
                <th className="px-6 py-4 text-left text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAnggota.map((anggota) => (
                <tr key={anggota.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{anggota.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{anggota.telepon}</td>
                  <td className="px-6 py-4 text-gray-600">{anggota.email}</td>
                  <td className="px-6 py-4 text-gray-600">{anggota.alamat}</td>
                  <td className="px-6 py-4 text-gray-600">{anggota.totalSampah} Kg</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(anggota.status)}`}>
                      {anggota.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${anggota.pembayaran === 'lunas' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {anggota.pembayaran}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDetail(anggota)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleEdit(anggota)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(anggota.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAnggota.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada data anggota ditemukan
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-gray-900">
                {modalMode === 'add' && 'Tambah Anggota Baru'}
                {modalMode === 'edit' && 'Edit Data Anggota'}
                {modalMode === 'detail' && 'Detail Anggota'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'detail' && selectedAnggota ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Nama</label>
                    <p className="text-gray-900">{selectedAnggota.nama}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Telepon</label>
                    <p className="text-gray-900">{selectedAnggota.telepon}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Email</label>
                    <p className="text-gray-900">{selectedAnggota.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Alamat</label>
                    <p className="text-gray-900">{selectedAnggota.alamat}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Total Sampah Dibakar</label>
                    <p className="text-gray-900">{selectedAnggota.totalSampah} Kg</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadge(selectedAnggota.status)}`}>
                      {selectedAnggota.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Masukkan nama lengkap"
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
                      placeholder="Masukkan alamat lengkap"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
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
                  <div>
                    <label className="block text-gray-700 mb-2">Pembayaran</label>
                    <select
                      value={formData.pembayaran}
                      onChange={(e) => setFormData({ ...formData, pembayaran: e.target.value as any })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                    >
                      <option value="lunas">Lunas</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {modalMode !== 'detail' && (
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
                  {modalMode === 'add' ? 'Tambah' : 'Simpan'}
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

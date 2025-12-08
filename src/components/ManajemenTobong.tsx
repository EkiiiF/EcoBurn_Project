import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Modal } from './Modal';

interface TobongData {
  id: number;
  namaTobong: string;
  tanggalPembuatan: string;
  lokasi: string;
  kapasitas: number;
  kapasitasAbu: number;
  status: 'tersedia' | 'penuh' | 'maintenance';
}

interface ManajemenTobongProps {
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export function ManajemenTobong({ showToast }: ManajemenTobongProps) {
  const [tobongList, setTobongList] = useState<TobongData[]>([
    { id: 1, namaTobong: 'Tobong A', tanggalPembuatan: '2024-01-15', lokasi: 'Area Utara', kapasitas: 100, kapasitasAbu: 25, status: 'tersedia' },
    { id: 2, namaTobong: 'Tobong B', tanggalPembuatan: '2024-02-20', lokasi: 'Area Selatan', kapasitas: 150, kapasitasAbu: 30, status: 'tersedia' },
    { id: 3, namaTobong: 'Tobong C', tanggalPembuatan: '2024-03-10', lokasi: 'Area Timur', kapasitas: 120, kapasitasAbu: 28, status: 'maintenance' },
    { id: 4, namaTobong: 'Tobong D', tanggalPembuatan: '2024-04-05', lokasi: 'Area Barat', kapasitas: 80, kapasitasAbu: 20, status: 'tersedia' },
    { id: 5, namaTobong: 'Tobong E', tanggalPembuatan: '2024-05-12', lokasi: 'Area Tengah', kapasitas: 200, kapasitasAbu: 40, status: 'penuh' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'detail'>('add');
  const [selectedTobong, setSelectedTobong] = useState<TobongData | null>(null);
  const [formData, setFormData] = useState({
    namaTobong: '',
    lokasi: '',
    kapasitas: '',
    kapasitasAbu: '',
    status: 'tersedia' as 'tersedia' | 'penuh' | 'maintenance',
  });

  const filteredTobong = tobongList.filter(tobong =>
    tobong.namaTobong.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tobong.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      namaTobong: '',
      lokasi: '',
      kapasitas: '',
      kapasitasAbu: '',
      status: 'tersedia',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (tobong: TobongData) => {
    setModalMode('edit');
    setSelectedTobong(tobong);
    setFormData({
      namaTobong: tobong.namaTobong,
      lokasi: tobong.lokasi,
      kapasitas: tobong.kapasitas.toString(),
      kapasitasAbu: tobong.kapasitasAbu.toString(),
      status: tobong.status,
    });
    setIsModalOpen(true);
  };

  const handleDetail = (tobong: TobongData) => {
    setModalMode('detail');
    setSelectedTobong(tobong);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus tobong ini?')) {
      setTobongList(tobongList.filter(t => t.id !== id));
      showToast('Tobong berhasil dihapus', 'success');
    }
  };

  const handleSubmit = () => {
    if (!formData.namaTobong || !formData.lokasi || !formData.kapasitas) {
      showToast('Mohon lengkapi semua field', 'warning');
      return;
    }

    if (modalMode === 'add') {
      const newTobong: TobongData = {
        id: Math.max(...tobongList.map(t => t.id)) + 1,
        namaTobong: formData.namaTobong,
        tanggalPembuatan: new Date().toISOString().split('T')[0],
        lokasi: formData.lokasi,
        kapasitas: Number(formData.kapasitas),
        kapasitasAbu: Number(formData.kapasitasAbu),
        status: formData.status,
      };
      setTobongList([...tobongList, newTobong]);
      showToast('Tobong berhasil ditambahkan', 'success');
    } else if (modalMode === 'edit' && selectedTobong) {
      setTobongList(tobongList.map(t =>
        t.id === selectedTobong.id
          ? {
              ...t,
              namaTobong: formData.namaTobong,
              lokasi: formData.lokasi,
              kapasitas: Number(formData.kapasitas),
              kapasitasAbu: Number(formData.kapasitasAbu),
              status: formData.status,
            }
          : t
      ));
      showToast('Data tobong berhasil diperbarui', 'success');
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      tersedia: 'bg-green-100 text-green-700',
      penuh: 'bg-orange-100 text-orange-700',
      maintenance: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Manajemen Tobong</h1>
        <p className="text-gray-600">Kelola data tobong pembakaran sampah</p>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Cari nama tobong atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="bg-[#4C9876] text-white px-4 py-2.5 rounded-xl hover:bg-[#3d7a5e] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            <span>Tambah Tobong</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm mb-1">Total Tobong</div>
          <div className="text-gray-900">{tobongList.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm mb-1">Tersedia</div>
          <div className="text-green-600">{tobongList.filter(t => t.status === 'tersedia').length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-gray-600 text-sm mb-1">Maintenance</div>
          <div className="text-red-600">{tobongList.filter(t => t.status === 'maintenance').length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Nama Tobong</th>
                <th className="px-6 py-4 text-left text-gray-700">Tanggal Pembuatan</th>
                <th className="px-6 py-4 text-left text-gray-700">Lokasi</th>
                <th className="px-6 py-4 text-left text-gray-700">Kapasitas</th>
                <th className="px-6 py-4 text-left text-gray-700">Kapasitas Abu</th>
                <th className="px-6 py-4 text-left text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTobong.map((tobong) => (
                <tr key={tobong.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{tobong.namaTobong}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(tobong.tanggalPembuatan).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-600">{tobong.lokasi}</td>
                  <td className="px-6 py-4 text-gray-600">{tobong.kapasitas} Kg</td>
                  <td className="px-6 py-4 text-gray-600">{tobong.kapasitasAbu} Kg</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(tobong.status)}`}>
                      {tobong.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDetail(tobong)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleEdit(tobong)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(tobong.id)}
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

        {filteredTobong.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada data tobong ditemukan
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
                {modalMode === 'add' && 'Tambah Tobong Baru'}
                {modalMode === 'edit' && 'Edit Data Tobong'}
                {modalMode === 'detail' && 'Detail Tobong'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'detail' && selectedTobong ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Nama Tobong</label>
                    <p className="text-gray-900">{selectedTobong.namaTobong}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Tanggal Pembuatan</label>
                    <p className="text-gray-900">{new Date(selectedTobong.tanggalPembuatan).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Lokasi</label>
                    <p className="text-gray-900">{selectedTobong.lokasi}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Kapasitas Sampah</label>
                    <p className="text-gray-900">{selectedTobong.kapasitas} Kg</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Kapasitas Abu</label>
                    <p className="text-gray-900">{selectedTobong.kapasitasAbu} Kg</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Status Operasional</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadge(selectedTobong.status)}`}>
                      {selectedTobong.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nama Tobong</label>
                    <input
                      type="text"
                      value={formData.namaTobong}
                      onChange={(e) => setFormData({ ...formData, namaTobong: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Contoh: Tobong F"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Lokasi</label>
                    <input
                      type="text"
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Contoh: Area Utara"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Kapasitas Sampah (Kg)</label>
                    <input
                      type="number"
                      value={formData.kapasitas}
                      onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Masukkan kapasitas"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Kapasitas Abu (Kg)</label>
                    <input
                      type="number"
                      value={formData.kapasitasAbu}
                      onChange={(e) => setFormData({ ...formData, kapasitasAbu: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Masukkan kapasitas abu"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status Operasional</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="penuh">Penuh</option>
                      <option value="maintenance">Maintenance</option>
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

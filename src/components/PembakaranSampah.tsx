import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Modal } from './Modal';

interface PembakaranData {
  id: number;
  namaAnggota: string;
  jenisPembakaran: 'sekali' | 'langganan';
  beratSampah: number;
  statusProses: 'pending' | 'proses' | 'selesai';
  namaTobong: string;
  tanggal: string;
  jumlahUang?: number;
}

interface PembakaranSampahProps {
  showToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export function PembakaranSampah({ showToast }: PembakaranSampahProps) {
  const [pembakaranList, setPembakaranList] = useState<PembakaranData[]>([
    { id: 1, namaAnggota: 'Ahmad Rizki', jenisPembakaran: 'langganan', beratSampah: 25, statusProses: 'selesai', namaTobong: 'Tobong A', tanggal: '2024-12-05' },
    { id: 2, namaAnggota: 'Siti Nurhaliza', jenisPembakaran: 'langganan', beratSampah: 18, statusProses: 'selesai', namaTobong: 'Tobong B', tanggal: '2024-12-06' },
    { id: 3, namaAnggota: 'Budi Santoso', jenisPembakaran: 'sekali', beratSampah: 30, statusProses: 'proses', namaTobong: 'Tobong A', tanggal: '2024-12-07', jumlahUang: 75000 },
    { id: 4, namaAnggota: 'Dewi Lestari', jenisPembakaran: 'langganan', beratSampah: 22, statusProses: 'pending', namaTobong: 'Tobong C', tanggal: '2024-12-08' },
    { id: 5, namaAnggota: 'Eko Prasetyo', jenisPembakaran: 'sekali', beratSampah: 15, statusProses: 'pending', namaTobong: 'Tobong B', tanggal: '2024-12-08', jumlahUang: 50000 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'detail'>('add');
  const [selectedPembakaran, setSelectedPembakaran] = useState<PembakaranData | null>(null);
  const [formData, setFormData] = useState({
    jenisPembakaran: 'langganan' as 'sekali' | 'langganan',
    namaAnggota: '',
    beratSampah: '',
    namaTobong: 'Tobong A',
    jumlahUang: '',
    statusProses: 'pending' as 'pending' | 'proses' | 'selesai',
  });

  const tobongList = ['Tobong A', 'Tobong B', 'Tobong C', 'Tobong D'];
  const anggotaList = ['Ahmad Rizki', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Lestari', 'Eko Prasetyo'];

  const filteredPembakaran = pembakaranList.filter(pembakaran =>
    pembakaran.namaAnggota.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pembakaran.namaTobong.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      jenisPembakaran: 'langganan',
      namaAnggota: '',
      beratSampah: '',
      namaTobong: 'Tobong A',
      jumlahUang: '',
      statusProses: 'pending',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (pembakaran: PembakaranData) => {
    setModalMode('edit');
    setSelectedPembakaran(pembakaran);
    setFormData({
      jenisPembakaran: pembakaran.jenisPembakaran,
      namaAnggota: pembakaran.namaAnggota,
      beratSampah: pembakaran.beratSampah.toString(),
      namaTobong: pembakaran.namaTobong,
      jumlahUang: pembakaran.jumlahUang?.toString() || '',
      statusProses: pembakaran.statusProses,
    });
    setIsModalOpen(true);
  };

  const handleDetail = (pembakaran: PembakaranData) => {
    setModalMode('detail');
    setSelectedPembakaran(pembakaran);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pembakaran ini?')) {
      setPembakaranList(pembakaranList.filter(p => p.id !== id));
      showToast('Data pembakaran berhasil dihapus', 'success');
    }
  };

  const handleSubmit = () => {
    if (!formData.namaAnggota || !formData.beratSampah) {
      showToast('Mohon lengkapi semua field', 'warning');
      return;
    }

    if (modalMode === 'add') {
      const newPembakaran: PembakaranData = {
        id: Math.max(...pembakaranList.map(p => p.id)) + 1,
        namaAnggota: formData.namaAnggota,
        jenisPembakaran: formData.jenisPembakaran,
        beratSampah: Number(formData.beratSampah),
        statusProses: formData.statusProses,
        namaTobong: formData.namaTobong,
        tanggal: new Date().toISOString().split('T')[0],
        ...(formData.jenisPembakaran === 'sekali' && formData.jumlahUang ? { jumlahUang: Number(formData.jumlahUang) } : {}),
      };
      setPembakaranList([newPembakaran, ...pembakaranList]);
      showToast('Data pembakaran berhasil ditambahkan', 'success');
    } else if (modalMode === 'edit' && selectedPembakaran) {
      setPembakaranList(pembakaranList.map(p =>
        p.id === selectedPembakaran.id
          ? {
              ...p,
              namaAnggota: formData.namaAnggota,
              jenisPembakaran: formData.jenisPembakaran,
              beratSampah: Number(formData.beratSampah),
              statusProses: formData.statusProses,
              namaTobong: formData.namaTobong,
              ...(formData.jenisPembakaran === 'sekali' && formData.jumlahUang ? { jumlahUang: Number(formData.jumlahUang) } : { jumlahUang: undefined }),
            }
          : p
      ));
      showToast('Data pembakaran berhasil diperbarui', 'success');
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      proses: 'bg-blue-100 text-blue-700',
      selesai: 'bg-green-100 text-green-700',
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Pembakaran Sampah</h1>
        <p className="text-gray-600">Kelola data pembakaran sampah anggota</p>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Cari nama anggota atau tobong..."
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
            <span>Tambah Pembakaran</span>
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
                <th className="px-6 py-4 text-left text-gray-700">Nama Anggota</th>
                <th className="px-6 py-4 text-left text-gray-700">Jenis</th>
                <th className="px-6 py-4 text-left text-gray-700">Berat Sampah</th>
                <th className="px-6 py-4 text-left text-gray-700">Tobong</th>
                <th className="px-6 py-4 text-left text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-gray-700">Pembayaran</th>
                <th className="px-6 py-4 text-left text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPembakaran.map((pembakaran) => (
                <tr key={pembakaran.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{new Date(pembakaran.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-900">{pembakaran.namaAnggota}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      pembakaran.jenisPembakaran === 'langganan' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {pembakaran.jenisPembakaran}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{pembakaran.beratSampah} Kg</td>
                  <td className="px-6 py-4 text-gray-600">{pembakaran.namaTobong}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(pembakaran.statusProses)}`}>
                      {pembakaran.statusProses}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {pembakaran.jumlahUang ? `Rp ${pembakaran.jumlahUang.toLocaleString('id-ID')}` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDetail(pembakaran)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleEdit(pembakaran)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(pembakaran.id)}
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

        {filteredPembakaran.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada data pembakaran ditemukan
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
                {modalMode === 'add' && 'Tambah Data Pembakaran'}
                {modalMode === 'edit' && 'Edit Data Pembakaran'}
                {modalMode === 'detail' && 'Detail Pembakaran'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'detail' && selectedPembakaran ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Tanggal</label>
                    <p className="text-gray-900">{new Date(selectedPembakaran.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Nama Anggota</label>
                    <p className="text-gray-900">{selectedPembakaran.namaAnggota}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Jenis Pembakaran</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      selectedPembakaran.jenisPembakaran === 'langganan' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {selectedPembakaran.jenisPembakaran}
                    </span>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Berat Sampah</label>
                    <p className="text-gray-900">{selectedPembakaran.beratSampah} Kg</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Tobong</label>
                    <p className="text-gray-900">{selectedPembakaran.namaTobong}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Status Proses</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusBadge(selectedPembakaran.statusProses)}`}>
                      {selectedPembakaran.statusProses}
                    </span>
                  </div>
                  {selectedPembakaran.jumlahUang && (
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Pembayaran</label>
                      <p className="text-gray-900">Rp {selectedPembakaran.jumlahUang.toLocaleString('id-ID')}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Jenis Pembakaran</label>
                    <select
                      value={formData.jenisPembakaran}
                      onChange={(e) => setFormData({ ...formData, jenisPembakaran: e.target.value as 'sekali' | 'langganan' })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                    >
                      <option value="langganan">Langganan</option>
                      <option value="sekali">Sekali Pembakaran</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      {formData.jenisPembakaran === 'langganan' ? 'Nama Anggota' : 'Nama Pembakar'}
                    </label>
                    {formData.jenisPembakaran === 'langganan' ? (
                      <select
                        value={formData.namaAnggota}
                        onChange={(e) => setFormData({ ...formData, namaAnggota: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      >
                        <option value="">Pilih Anggota</option>
                        {anggotaList.map(anggota => (
                          <option key={anggota} value={anggota}>{anggota}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData.namaAnggota}
                        onChange={(e) => setFormData({ ...formData, namaAnggota: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                        placeholder="Masukkan nama pembakar"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Berat Sampah (Kg)</label>
                    <input
                      type="number"
                      value={formData.beratSampah}
                      onChange={(e) => setFormData({ ...formData, beratSampah: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                      placeholder="Masukkan berat sampah"
                    />
                  </div>

                  {formData.jenisPembakaran === 'sekali' && (
                    <div>
                      <label className="block text-gray-700 mb-2">Jumlah Uang (Rp)</label>
                      <input
                        type="number"
                        value={formData.jumlahUang}
                        onChange={(e) => setFormData({ ...formData, jumlahUang: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                        placeholder="Masukkan jumlah pembayaran"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 mb-2">Tobong yang Digunakan</label>
                    <select
                      value={formData.namaTobong}
                      onChange={(e) => setFormData({ ...formData, namaTobong: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                    >
                      {tobongList.map(tobong => (
                        <option key={tobong} value={tobong}>{tobong}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Status Proses</label>
                    <select
                      value={formData.statusProses}
                      onChange={(e) => setFormData({ ...formData, statusProses: e.target.value as any })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C9876]"
                    >
                      <option value="pending">Pending</option>
                      <option value="proses">Proses</option>
                      <option value="selesai">Selesai</option>
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

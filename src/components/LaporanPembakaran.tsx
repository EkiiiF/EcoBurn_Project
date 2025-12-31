import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Clock, Flame, Package, Calendar, X, AlertCircle, Loader2 } from 'lucide-react';

// --- Komponen Toast ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  return (
    <div className={`fixed top-4 right-4 z-[60] px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 transform translate-y-0 animate-in slide-in-from-top-5 ${
      type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
    }`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="ml-4 hover:opacity-70 p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export function LaporanPembakaran() {
  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading saat submit form
  const [isFetching, setIsFetching] = useState(true); // Loading saat ambil data awal
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
  // State Data Laporan (Awalnya kosong array)
  const [laporanData, setLaporanData] = useState<any[]>([]);

  // State Form
  const [formData, setFormData] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    status: 'selesai'
  });

  // --- HELPER: LOGIKA PROGRESS BAR ---
  // Fungsi ini mengubah status tunggal dari DB (pending/proses/selesai)
  // menjadi array tahapan visual untuk UI
  const generateProgressFromStatus = (status: string, createdAt: string, updatedAt: string) => {
    const steps = [
      { step: 'Pengajuan', completed: true, date: createdAt }, // Selalu true karena data sudah masuk
      { step: 'Persiapan', completed: false, date: null as string | null },
      { step: 'Pembakaran', completed: false, date: null as string | null },
      { step: 'Selesai', completed: false, date: null as string | null },
    ];

    if (status === 'proses') {
      steps[1].completed = true; // Persiapan selesai
      steps[1].date = updatedAt; // Asumsi mulai proses = updated_at
      steps[2].completed = true; // Sedang pembakaran (dianggap aktif/completed step-nya)
    } else if (status === 'selesai') {
      steps[1].completed = true;
      steps[2].completed = true;
      steps[3].completed = true;
      steps[3].date = updatedAt; // Waktu selesai
    }

    return steps;
  };

  // --- HELPER: WARNA STATUS ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selesai': return 'text-green-600 bg-green-100';
      case 'proses': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- FETCH DATA DARI API ---
  const fetchLaporanData = useCallback(async () => {
    setIsFetching(true);
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Jika tidak ada token, biarkan kosong atau redirect (ditangani di layout biasanya)
      setIsFetching(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/riwayat', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data riwayat');
      }

      const apiData = await response.json();

      // MAPPING DATA API KE FORMAT FRONTEND
      // Backend: { aktivitas_id, pelanggan: {nama_lengkap}, jumlah_kg, waktu_pencatatan, status_proses }
      // Frontend: { id, namaPembakar, totalSampah, tanggalPembakaran, status, progress: [] }
      const formattedData = apiData.map((item: any) => ({
        id: item.aktivitas_id,
        // Jika ada relasi pelanggan, ambil namanya. Jika tidak (Sekali Bakar), pakai 'Pelanggan Umum'
        namaPembakar: item.pelanggan ? item.pelanggan.nama_lengkap : 'Pelanggan Umum (Non-Member)',
        totalSampah: item.jumlah_kg,
        tanggalPembakaran: item.waktu_pencatatan,
        status: item.status_proses,
        // Generate visual progress bar berdasarkan status
        progress: generateProgressFromStatus(item.status_proses, item.waktu_pencatatan, item.updated_at)
      }));

      setLaporanData(formattedData);

    } catch (error) {
      console.error("Error fetching data:", error);
      // Opsional: showToast("Gagal memuat data", "error");
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Panggil Fetch Data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchLaporanData();
  }, [fetchLaporanData]);

  // --- HANDLER UPDATE STATUS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBulkUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
       showToast("Harap lengkapi rentang tanggal dan jam.", "error");
       setIsLoading(false);
       return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
        showToast("Anda belum login.", "error");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/riwayat/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.status === 401) {
          throw new Error("Sesi kadaluwarsa. Silakan Login ulang.");
      }

      if (!response.ok) {
        throw new Error(result.message || 'Gagal update.');
      }

      showToast(result.message, "success");
      setIsModalOpen(false);
      
      // Reset Form
      setFormData({ startDate: '', startTime: '', endDate: '', endTime: '', status: 'selesai' });

      // **REFRESH DATA OTOMATIS SETELAH UPDATE BERHASIL**
      fetchLaporanData();

    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Hitung Summary dari Data Real
  const totalSampahDibakar = laporanData.reduce((sum, item) => sum + item.totalSampah, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Laporan Pembakaran</h1>
          <p className="text-gray-600">Riwayat dan status pembakaran sampah</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4C9876] hover:bg-[#3b7a5e] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
        >
          <Clock className="w-5 h-5" />
          <span className="font-medium">Update Status Massal</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm font-medium">Total Sampah</div>
              <div className="text-gray-900 text-xl font-bold">
                 {isFetching ? '...' : `${totalSampahDibakar} Kg`}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm font-medium">Selesai</div>
              <div className="text-gray-900 text-xl font-bold">
                {isFetching ? '...' : laporanData.filter(d => d.status === 'selesai').length}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm font-medium">Dalam Proses</div>
              <div className="text-gray-900 text-xl font-bold">
                {isFetching ? '...' : laporanData.filter(d => d.status === 'proses').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIST DATA */}
      <div className="space-y-6">
        {isFetching ? (
           // Tampilan Loading Skeleton Sederhana
           <div className="text-center py-10 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#4C9876]" />
              Memuat data riwayat...
           </div>
        ) : laporanData.length === 0 ? (
           // Tampilan Jika Kosong
           <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">Belum ada data riwayat pembakaran.</p>
           </div>
        ) : (
          // Tampilan Data Asli
          laporanData.map((laporan) => (
            <div key={laporan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
              <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-gray-900 text-lg font-bold mb-1">{laporan.namaPembakar}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(laporan.tanggalPembakaran).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                       <span className="mx-1">•</span>
                      {new Date(laporan.tanggalPembakaran).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <Package className="w-4 h-4 text-gray-400" strokeWidth={2} />
                      <span className="text-gray-700 font-medium">{laporan.totalSampah} Kg</span>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${getStatusColor(laporan.status)}`}>
                      {laporan.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Stepper Visual */}
              <div className="p-6 bg-gray-50/30">
                <div className="relative">
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 hidden md:block" />
                  <div 
                    className="absolute top-6 left-6 h-0.5 bg-[#4C9876] transition-all duration-1000 ease-out hidden md:block"
                    style={{ 
                      width: `calc(${(laporan.progress.filter((p:any) => p.completed).length - 1) / (laporan.progress.length - 1) * 100}% - 48px)` 
                    }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                    {laporan.progress.map((step:any, index:number) => (
                      <div key={index} className="relative flex flex-row md:flex-col items-center gap-4 md:gap-0">
                        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center z-10 transition-all duration-300 border-4 ${
                          step.completed 
                            ? 'bg-[#4C9876] text-white border-white shadow-lg' 
                            : 'bg-white text-gray-300 border-gray-100'
                        }`}>
                          {step.completed ? <CheckCircle className="w-6 h-6" strokeWidth={2.5} /> : <Clock className="w-6 h-6" strokeWidth={2} />}
                        </div>
                        {index < laporan.progress.length - 1 && (
                          <div className={`absolute left-6 top-12 bottom-[-24px] w-0.5 md:hidden -z-0 ${
                             step.completed && laporan.progress[index + 1].completed ? 'bg-[#4C9876]' : 'bg-gray-200'
                          }`} />
                        )}
                        <div className="md:text-center md:mt-3 flex-1">
                          <p className={`text-sm font-bold mb-0.5 ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.step}
                          </p>
                          {step.date ? (
                            <p className="text-xs text-[#4C9876] font-medium bg-[#4C9876]/10 inline-block px-2 py-0.5 rounded-md md:bg-transparent md:px-0">
                              {new Date(step.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 italic">--:--</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Popup (Tetap sama) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !isLoading && setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden transform transition-all scale-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#4C9876]" />
                Update Status Massal
              </h2>
              <button onClick={() => setIsModalOpen(false)} disabled={isLoading} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleBulkUpdate} className="p-6 space-y-5">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4">
                <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-2">
                  <Clock className="w-4 h-4" /> Rentang Waktu
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Mulai</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full text-sm rounded-lg border-gray-300 border p-2.5 outline-none focus:border-[#4C9876]" required />
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} className="w-full text-sm rounded-lg border-gray-300 border p-2.5 outline-none focus:border-[#4C9876]" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Sampai</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full text-sm rounded-lg border-gray-300 border p-2.5 outline-none focus:border-[#4C9876]" required />
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} className="w-full text-sm rounded-lg border-gray-300 border p-2.5 outline-none focus:border-[#4C9876]" required />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status Baru</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full rounded-xl border-gray-300 border p-3 bg-white outline-none focus:border-[#4C9876]">
                  <option value="pending">Pending</option>
                  <option value="proses">Proses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isLoading} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={isLoading} className="px-5 py-2.5 text-sm font-medium text-white bg-[#4C9876] rounded-xl hover:bg-[#3b7a5e] flex items-center gap-2">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
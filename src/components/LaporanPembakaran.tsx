import { CheckCircle, Clock, Flame, Package } from 'lucide-react';

export function LaporanPembakaran() {
  const laporanData = [
    {
      id: 1,
      namaPembakar: 'Ahmad Rizki',
      totalSampah: 125,
      tanggalPembakaran: '2024-12-01',
      status: 'selesai',
      progress: [
        { step: 'Pengajuan', completed: true, date: '2024-12-01 08:00' },
        { step: 'Persiapan', completed: true, date: '2024-12-01 09:30' },
        { step: 'Pembakaran', completed: true, date: '2024-12-01 10:00' },
        { step: 'Selesai', completed: true, date: '2024-12-01 14:30' },
      ]
    },
    {
      id: 2,
      namaPembakar: 'Siti Nurhaliza',
      totalSampah: 98,
      tanggalPembakaran: '2024-12-03',
      status: 'proses',
      progress: [
        { step: 'Pengajuan', completed: true, date: '2024-12-03 07:00' },
        { step: 'Persiapan', completed: true, date: '2024-12-03 08:00' },
        { step: 'Pembakaran', completed: true, date: '2024-12-03 09:00' },
        { step: 'Selesai', completed: false, date: null },
      ]
    },
    {
      id: 3,
      namaPembakar: 'Budi Santoso',
      totalSampah: 156,
      tanggalPembakaran: '2024-12-05',
      status: 'pending',
      progress: [
        { step: 'Pengajuan', completed: true, date: '2024-12-05 06:00' },
        { step: 'Persiapan', completed: false, date: null },
        { step: 'Pembakaran', completed: false, date: null },
        { step: 'Selesai', completed: false, date: null },
      ]
    },
  ];

  const totalSampahDibakar = laporanData.reduce((sum, item) => sum + item.totalSampah, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selesai': return 'text-green-600 bg-green-100';
      case 'proses': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Laporan Pembakaran</h1>
        <p className="text-gray-600">Riwayat dan status pembakaran sampah</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm">Total Sampah</div>
              <div className="text-gray-900">{totalSampahDibakar} Kg</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm">Selesai</div>
              <div className="text-gray-900">{laporanData.filter(d => d.status === 'selesai').length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-gray-600 text-sm">Dalam Proses</div>
              <div className="text-gray-900">{laporanData.filter(d => d.status === 'proses').length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {laporanData.map((laporan) => (
          <div key={laporan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-gray-900 mb-1">{laporan.namaPembakar}</h3>
                  <p className="text-gray-600 text-sm">Tanggal: {new Date(laporan.tanggalPembakaran).toLocaleDateString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    <span className="text-gray-700">{laporan.totalSampah} Kg</span>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-sm ${getStatusColor(laporan.status)}`}>
                    {laporan.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="p-6">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 hidden md:block" />
                <div 
                  className="absolute top-6 left-6 h-0.5 bg-[#4C9876] transition-all duration-500 hidden md:block"
                  style={{ 
                    width: `calc(${(laporan.progress.filter(p => p.completed).length - 1) / (laporan.progress.length - 1) * 100}% - 48px)` 
                  }}
                />

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {laporan.progress.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center">
                      {/* Circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                        step.completed 
                          ? 'bg-[#4C9876] text-white shadow-md' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" strokeWidth={2} />
                        ) : (
                          <Clock className="w-6 h-6" strokeWidth={2} />
                        )}
                      </div>

                      {/* Label */}
                      <div className="text-center mt-3">
                        <p className={`text-sm mb-1 ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.step}
                        </p>
                        {step.date && (
                          <p className="text-xs text-gray-500">
                            {new Date(step.date).toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        )}
                      </div>

                      {/* Mobile Connector */}
                      {index < laporan.progress.length - 1 && (
                        <div className={`md:hidden w-0.5 h-8 my-2 ${
                          step.completed && laporan.progress[index + 1].completed 
                            ? 'bg-[#4C9876]' 
                            : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

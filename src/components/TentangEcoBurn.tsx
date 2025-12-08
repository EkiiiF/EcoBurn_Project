import { Leaf, Target, Users, Award } from 'lucide-react';

export function TentangEcoBurn() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#4C9876] rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-gray-900">Tentang EcoBurn</h1>
        </div>
        <p className="text-gray-600 text-lg">Platform pengelolaan pembakaran sampah ramah lingkungan dengan teknologi tobong asap</p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#4C9876]" strokeWidth={1.5} />
            <h2 className="text-gray-900">Visi</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Menjadi platform terdepan dalam pengelolaan sampah ramah lingkungan yang berkelanjutan, 
            menciptakan lingkungan bersih dan sehat untuk generasi mendatang.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-[#4C9876]" strokeWidth={1.5} />
            <h2 className="text-gray-900">Misi</h2>
          </div>
          <ul className="text-gray-600 leading-relaxed space-y-2">
            <li>• Menyediakan solusi pembakaran sampah yang aman dan ramah lingkungan</li>
            <li>• Mengurangi polusi udara melalui teknologi tobong asap</li>
            <li>• Meningkatkan kesadaran masyarakat tentang pengelolaan sampah</li>
          </ul>
        </div>
      </div>

      {/* About Content */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-gray-900 mb-4">Apa itu EcoBurn?</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            EcoBurn adalah sistem manajemen pembakaran sampah yang menggunakan teknologi <strong>Tobong Asap</strong>, 
            sebuah inovasi yang dirancang khusus untuk mengurangi dampak negatif pembakaran sampah terhadap lingkungan.
          </p>
          <p>
            Teknologi Tobong Asap mampu mengurangi emisi asap dan polutan hingga 98% dibandingkan dengan metode pembakaran 
            konvensional. Sistem ini dilengkapi dengan filter udara canggih dan kontrol suhu yang optimal untuk memastikan 
            proses pembakaran berlangsung efisien dan aman.
          </p>
          <p>
            Melalui platform digital yang user-friendly, EcoBurn memudahkan pengguna untuk:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Mendaftar dan mengelola akun anggota</li>
            <li>Melakukan penjadwalan pembakaran sampah</li>
            <li>Memantau status pembakaran secara real-time</li>
            <li>Melihat riwayat dan laporan pembakaran</li>
            <li>Mengelola keuangan dan pembayaran</li>
          </ul>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-br from-[#4C9876] to-[#3d7a5e] rounded-xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6" strokeWidth={1.5} />
          <h2 className="text-white">Keunggulan EcoBurn</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Teknologi ramah lingkungan',
            'Pengurangan emisi 98%',
            'Sistem manajemen terintegrasi',
            'Laporan real-time',
            'Biaya terjangkau',
            'Dukungan pelanggan 24/7'
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white">✓ {feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

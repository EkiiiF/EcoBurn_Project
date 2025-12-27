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
        <p className="text-gray-600 text-lg">ECOBURN adalah sistem cerdas untuk pengelolaan dan pembakaran sampah yang dikembangkan guna mendukung program kebersihan Kelurahan Bausasran. Saat ini, tersedia 2 unit Tobong Asap, yaitu teknologi pembakar sampah minim polusi yang menjadi alternatif lebih aman dibanding pembakaran terbuka.</p>
        {/* <br />
        <p className="text-gray-600 text-lg">Dengan kombinasi monitoring dan prediksi, ECOBURN menjadi langkah awal menuju sistem pengelolaan sampah yang modern, efisien, transparan, dan berbasis data. Sistem ini juga dapat berkembang menjadi layanan digital bagi warga di masa mendatang.</p> */}
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
          <p>EcoBurn adalah sistem manajemen pembakaran sampah yang menggunakan teknologi <strong>Tobong Asap</strong>, sebuah inovasi yang dirancang khusus untuk mengurangi dampak negatif pembakaran sampah terhadap lingkungan.
          </p>
          <p>Ecoburn menghadirkan pendekatan modern dalam pengelolaan sampah dengan menggabungkan teknologi ramah lingkungan, sistem monitoring digital, dan fitur prediksi berbasis data. Dengan dukungan Tobong Asap dan dashboard analitik, kelurahan dapat mengelola operasional lebih efisien sekaligus meningkatkan kualitas lingkungan.
          </p>
          {/* <p>
            Melalui platform digital yang user-friendly, EcoBurn memudahkan pengguna untuk:
          </p> */}
          {/* <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Monitoring real-time untuk aktivitas pembakaran dan penggunaan tobong.</li>
            <li>Transparansi penuh melalui pencatatan otomatis dan pelaporan digital.</li>
            <li>Fitur prediksi cerdas (volume sampah, optimasi jadwal, deteksi hambatan).</li>
            <li>Dashboard analitik untuk pengambilan keputusan berbasis data.</li>
            <li>Siap berkembang menjadi layanan publik digital untuk warga.</li>
          </ul> */}
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
            'Monitoring real-time untuk aktivitas pembakaran dan penggunaan tobong.',
            'Transparansi penuh melalui pencatatan otomatis dan pelaporan digital.',
            'Fitur prediksi cerdas (volume sampah, optimasi jadwal, deteksi hambatan)',
            'Dashboard analitik untuk pengambilan keputusan berbasis data.',
            'Siap berkembang menjadi layanan publik digital untuk warga.',
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

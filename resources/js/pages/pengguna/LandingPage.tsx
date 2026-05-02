'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight, Heart, CheckCircle, Zap, Globe } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Disease } from '@/types/disease';
import DiseaseDetailModal from '@/components/Modal/DiseaseDetailModal';

const diseases: Disease[] = [
  {
    id: 'mastitis',
    name: 'Mastitis',
    shortDesc: 'Inflamasi pada kelenjar susu. Ditandai dengan pembengkakan, kemerahan, atau perubahan warna susu yang keluar.',
    image: '/images/farm1.jpg',
    fullDesc: 'Mastitis adalah peradangan pada ambing (kelenjar susu) sapi yang biasanya disebabkan oleh infeksi bakteri. Kondisi ini dapat mengurangi produksi susu dan kualitas susu yang dihasilkan. Jika tidak segera ditangani, mastitis dapat berlanjut menjadi masalah kesehatan yang lebih serius yang mempengaruhi produktivitas sapi.',
    symptoms: [
      'Pembengkakan pada ambing',
      'Kemerahan dan hangat pada ambing',
      'Susu keluar berbentuk gumpalan atau berubah warna',
      'Sapi terlihat tidak nyaman saat diperah',
      'Demam ringan',
      'Penurunan produksi susu'
    ]
  },
  {
    id: 'antraks',
    name: 'Antraks',
    shortDesc: 'Penyakit menular akut yang disebabkan bakteri. Gejala termasuk demam tinggi, lemas, dan bisa menyebabkan kematian mendadak.',
    image: '/images/farm2.jpg',
    fullDesc: 'Antraks adalah penyakit menular yang sangat serius yang disebabkan oleh bakteri Bacillus anthracis. Penyakit ini dapat menular ke manusia dan merupakan penyakit yang mudah menular antar ternak. Antraks dapat menyebabkan kematian mendadak tanpa gejala yang jelas pada beberapa kasus.',
    symptoms: [
      'Demam tinggi (hingga 40-41°C)',
      'Lemas dan tidak mau makan',
      'Kesulitan bernafas',
      'Keluarnya darah dari lubang alami tubuh',
      'Penurunan produksi susu drastis',
      'Kematian mendadak dalam beberapa jam'
    ]
  },
  {
    id: 'pmk',
    name: 'PMK (Penyakit Mulut Kaki)',
    shortDesc: 'Penyakit viral yang menyerang mulut dan kaki. Ditandai dengan lepuh, lemas, dan pincang pada sapi.',
    image: '/images/farm3.jpg',
    fullDesc: 'Penyakit Mulut Kaki (PMK) adalah penyakit viral yang sangat menular dan menyerang ternak berkuku genap termasuk sapi. Penyakit ini ditandai dengan munculnya lepuh pada mulut, lidah, dan kaki. Sapi akan terlihat sangat lemas dan kesulitan makan serta berjalan.',
    symptoms: [
      'Terbentuk lepuh (blister) di mulut dan lidah',
      'Lepuh pada kaki dan di antara jari kaki',
      'Air liur berlebihan dan sulit menelan',
      'Sapi berjalan pincang atau tidak mau bergerak',
      'Demam ringan',
      'Penurunan berat badan dan produksi susu'
    ]
  },
  {
    id: 'cacingan',
    name: 'Cacingan',
    shortDesc: 'Infeksi parasit cacing pada saluran pencernaan. Menyebabkan penurunan berat badan dan produksi susu menurun.',
    image: '/images/farm1.jpg',
    fullDesc: 'Cacingan adalah infeksi yang disebabkan oleh cacing parasit yang hidup di saluran pencernaan sapi. Infeksi ini terjadi ketika sapi memakan pakan yang terkontaminasi telur cacing. Cacingan dapat menyebabkan malnutrisi dan penurunan performa produksi pada sapi.',
    symptoms: [
      'Penurunan berat badan',
      'Perut membuncit atau distended',
      'Penurunan produksi susu',
      'Diare atau kotoran lembek',
      'Bulu kusam dan tidak bersinar',
      'Apatis dan kurang aktif'
    ]
  }
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openDiseaseModal = (disease: Disease) => {
    setSelectedDisease(disease);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDisease(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
                <img src="/images/logo.png" alt="SapiDoc Logo" className="h-12 w-12 rounded-full" />
              <span className="font-bold text-xl text-emerald-600">SapiDoc</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Keunggulan
              </button>
              <button
                onClick={() => scrollToSection('cara-kerja')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => scrollToSection('penyakit')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Penyakit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-emerald-600 transition font-medium"
              >
                Kontak
              </button>
              <Link href="/admin/login" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition inline-block">
                Masuk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-emerald-600"
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Keunggulan
              </button>
              <button
                onClick={() => scrollToSection('cara-kerja')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Cara Kerja
              </button>
              <button
                onClick={() => scrollToSection('penyakit')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Penyakit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                Kontak
              </button>
              <Link href="/admin/login" className="block w-full bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition text-center">
                Masuk
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Sistem Diagnosis Penyakit{' '}
                <span className="text-emerald-600">Awal pada Sapi</span>
              </h1>
              <p className="text-lg text-gray-600">
                Platform pendamping untuk membantu peternak melakukan diagnosis awal penyakit pada sapi mereka. Dengan metode Certainty Factor, SapiDoc memberikan hasil diagnosis yang akurat untuk mendukung pengambilan keputusan kesehatan ternak Anda.
              </p>
            </div>

            <Link href="/diagnosis" className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2 text-lg">
              Mulai Diagnosis
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex items-center justify-center">
            <img 
              src="/images/ternak sapi.jpg" 
              alt="Sapi Sehat" 
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Keunggulan SapiDoc
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diagnosis awal yang akurat dan mudah diakses untuk peternak di Kebumen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Zap size={40} className="text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Diagnosis Cepat
              </h3>
              <p className="text-gray-600">
                Dapatkan hasil diagnosis dalam hitungan menit tanpa perlu menunggu lama.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <CheckCircle size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Hasil Akurat
              </h3>
              <p className="text-gray-600">
                Menggunakan metode Certainty Factor untuk memberikan hasil diagnosis yang terpercaya.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Heart size={40} className="text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mudah Digunakan
              </h3>
              <p className="text-gray-600">
                Interface intuitif yang dirancang khusus untuk kemudahan penggunaan tanpa perlu keahlian teknis.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
              <Globe size={40} className="text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Akses Dimana Saja
              </h3>
              <p className="text-gray-600">
                Akses diagnosis dari smartphone atau komputer Anda dengan mudah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Sistem Section */}
      <section id="cara-kerja" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Cara Kerja Sistem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tiga langkah mudah untuk mendapatkan diagnosis awal kesehatan ternak sapi Anda
          </p>
        </div>

        {/* Steps Container - Desktop */}
        <div className="hidden md:block">
          <div className="flex items-stretch gap-6">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Pilih Gejala
                </h3>
                <p className="text-gray-600 text-sm">
                  Identifikasi gejala yang dialami ternak berdasarkan pengamatan di lapangan
                </p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center justify-center w-12 flex-shrink-0">
              <div className="relative w-full h-0.5 bg-emerald-600">
                <ArrowRight size={24} className="absolute -right-6 -top-2.5 text-emerald-600" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Hitung dengan CF
                </h3>
                <p className="text-gray-600 text-sm">
                  Sistem menghitung otomatis menggunakan metode Certainty Factor
                </p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center justify-center w-12 flex-shrink-0">
              <div className="relative w-full h-0.5 bg-emerald-600">
                <ArrowRight size={24} className="absolute -right-6 -top-2.5 text-emerald-600" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-600 transition flex-1">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-emerald-100 border-2 border-emerald-600">
                  <span className="text-lg font-bold text-emerald-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Hasil Diagnosis
                </h3>
                <p className="text-gray-600 text-sm">
                  Dapatkan hasil dengan kemungkinan penyakit dan tingkat keyakinan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Container - Mobile */}
        <div className="md:hidden space-y-8">
          {/* Step 1 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">1</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Pilih Gejala
              </h3>
              <p className="text-gray-600 text-sm">
                Identifikasi gejala yang dialami ternak berdasarkan pengamatan di lapangan
              </p>
            </div>
          </div>

          {/* Divider Mobile */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-600"></div>
          </div>

          {/* Step 2 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">2</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hitung dengan CF
              </h3>
              <p className="text-gray-600 text-sm">
                Sistem menghitung otomatis menggunakan metode Certainty Factor
              </p>
            </div>
          </div>

          {/* Divider Mobile */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-emerald-600"></div>
          </div>

          {/* Step 3 - Mobile */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600">
                <span className="text-lg font-bold text-emerald-600">3</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hasil Diagnosis
              </h3>
              <p className="text-gray-600 text-sm">
                Dapatkan hasil dengan kemungkinan penyakit dan tingkat keyakinan
              </p>
            </div>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-blue-900 text-sm">
            <span className="font-bold">💡 Catatan:</span> Hasil diagnosis dari sistem SapiDoc adalah diagnosis awal yang membantu Anda untuk mengambil keputusan. Untuk diagnosis yang lebih akurat dan penanganan lanjutan, tetap disarankan untuk berkonsultasi dengan dokter hewan profesional.
          </p>
        </div>
      </section>

      {/* Informasi Penyakit Ternak Section */}
      <section id="penyakit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Informasi Penyakit Ternak
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari tentang penyakit-penyakit umum yang sering menyerang sapi ternak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map((disease) => (
            <div key={disease.id} className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{disease.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {disease.shortDesc}
              </p>
              <button 
                onClick={() => openDiseaseModal(disease)}
                className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition inline-flex items-center gap-2"
              >
                Lihat Detail
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery/Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Peternakan di Kebumen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Peternakan sapi di Kecamatan Petanahan, Kebumen yang memanfaatkan diagnosis digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gallery 1 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/ternak sapi.jpg" 
              alt="Peternakan Modern" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Peternakan Jawa Barat</p>
            </div>
          </div>

          {/* Gallery 2 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/farm2.jpg" 
              alt="Sapi Sehat Produktif" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Sapi Sehat & Produktif</p>
            </div>
          </div>

          {/* Gallery 3 */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition">
            <img 
              src="/images/farm3.jpg" 
              alt="Kandang Terawat" 
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
              <p className="text-white font-semibold">Kandang Higienis & Terawat</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-12">
            <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tentang SapiDoc
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SapiDoc adalah sistem pakar berbasis AI untuk diagnosis awal penyakit pada sapi. Dikembangkan menggunakan metode Certainty Factor, sistem ini membantu peternak melakukan identifikasi masalah kesehatan ternak secara dini, sehingga dapat mengambil tindakan yang tepat. Platform ini dapat diakses oleh peternak di Kecamatan Petanahan, Kabupaten Kebumen, dan sekitarnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-emerald-600 mb-2">Tinggi</p>
              <p className="text-gray-700 font-medium">Akurasi Diagnosis</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">Metode CF</p>
              <p className="text-gray-700 font-medium">Certainty Factor</p>
            </div>
            <div className="bg-red-50 p-8 rounded-xl text-center">
              <p className="text-4xl font-bold text-red-500 mb-2">Akses</p>
              <p className="text-gray-700 font-medium">Mudah & Cepat</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Mulai Diagnosis Awal Sekarang
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Gunakan SapiDoc untuk membantu Anda mendeteksi masalah kesehatan sapi sejak dini.
          </p>
          <Link href="/diagnosis" className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2 text-lg">
            Mulai Sekarang
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-600/20 rounded-full p-2">
                  <img src="/images/logo.png" alt="SapiDoc Logo" className="h-10 w-10 rounded-full" />
                </div>
                <h3 className="text-white font-bold text-lg">SapiDoc</h3>
              </div>
              <p className="text-sm">
                Sistem pakar untuk diagnosis awal penyakit sapi menggunakan metode Certainty Factor.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: sapidoc@kebumen.id</li>
                <li>Phone: +62 812 3456 7890</li>
                <li>Address: Kec. Petanahan, Kebumen</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; 2024 SapiDoc. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Disease Detail Modal */}
      <DiseaseDetailModal
        isOpen={isModalOpen}
        disease={selectedDisease}
        onClose={closeModal}
      />
    </div>
  );
}

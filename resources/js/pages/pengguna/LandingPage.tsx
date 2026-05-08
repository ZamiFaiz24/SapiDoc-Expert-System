'use client';

import { useState } from 'react';

import Navbar from '@/components/Landing/Navbar';
import HeroSection from '@/components/Landing/HeroSection';
import FeaturesSection from '@/components/Landing/FeaturesSection';
import WorkSection from '@/components/Landing/WorkFlowSection';
import InformationSection from '@/components/Landing/InformationSection';
import GallerySection from '@/components/Landing/GallerySection';
import AboutSection from '@/components/Landing/AboutSection';
import CTASection from '@/components/Landing/CTASection';
import Footer from '@/components/Landing/Footer';

import DiseaseDetailModal from '@/components/Modal/DiseaseDetailModal';

import type { Disease } from '@/types/disease';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDisease, setSelectedDisease] =
    useState<Disease | null>(null);

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
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <WorkSection />

      <InformationSection
        diseases={diseases}
        openDiseaseModal={openDiseaseModal}
      />

      <GallerySection />

      <AboutSection />

      <CTASection />

      <Footer />

      {/* Disease Detail Modal */}
      <DiseaseDetailModal
        isOpen={isModalOpen}
        disease={selectedDisease}
        onClose={closeModal}
      />
    </div>
  );
}

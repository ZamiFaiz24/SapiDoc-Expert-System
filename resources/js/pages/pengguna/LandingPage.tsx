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

interface PenyakitRecord {
  id: number;
  kode_penyakit: string;
  nama_penyakit: string;
  deskripsi: string | null;
}

interface LandingPageProps {
  penyakits: PenyakitRecord[];
}

export default function LandingPage({ penyakits }: LandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDisease, setSelectedDisease] =
    useState<Disease | null>(null);

  const diseases: Disease[] = penyakits.map((penyakit) => ({
    id: penyakit.kode_penyakit,
    name: penyakit.nama_penyakit,
    shortDesc: penyakit.deskripsi
      ? penyakit.deskripsi.length > 110
        ? `${penyakit.deskripsi.slice(0, 110).trimEnd()}...`
        : penyakit.deskripsi
      : 'Deskripsi belum tersedia.',
    image: '',
    fullDesc: penyakit.deskripsi || 'Deskripsi belum tersedia.',
    symptoms: [],
  }));

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

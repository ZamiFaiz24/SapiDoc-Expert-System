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

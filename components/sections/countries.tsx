'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const countries = [
  {
    name: 'Nepal',
    flag: '🇳🇵',
    description: 'Digital Innovation Hub',
    color: '#FF6B6B',
    gradient: 'from-red-500/20 to-red-600/10',
  },
  {
    name: 'Singapore',
    flag: '🇸🇬',
    description: 'Smart Solutions',
    color: '#FFE66D',
    gradient: 'from-yellow-500/20 to-yellow-600/10',
  },
  {
    name: 'India',
    flag: '🇮🇳',
    description: 'Tech Excellence Center',
    color: '#4ECDC4',
    gradient: 'from-cyan-500/20 to-cyan-600/10',
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Creative Studios',
    color: '#95E1D3',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
  },
];

interface Country3DBoxProps {
  country: typeof countries[0];
  index: number;
  progress: any;
}

const Country3DBox = ({ country, index, progress }: Country3DBoxProps) => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = progress.get();
    
    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.x = Math.sin(p * Math.PI) * 0.4;
    meshRef.current.position.y = Math.sin(Date.now() * 0.0008 + index) * 0.3;
    
    const scale = 0.8 + Math.sin(p * Math.PI) * 0.4;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial
            color={country.color}
            emissive={country.color}
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Countries = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
  });

  // Calculate horizontal scroll based on vertical scroll
  const xTranslate = useTransform(springProgress, [0, 1], [0, -window.innerWidth * 3.5]);

  return (
    <div ref={containerRef} className="relative">
      {/* Header Section */}
      <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 text-balance"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Global Presence
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Where we&apos;ve created impact across continents
          </motion.p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-gray-600 text-sm font-mono tracking-widest"
          >
            SCROLL DOWN TO EXPLORE
          </motion.div>
        </motion.div>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <motion.div
            className="absolute top-20 left-10 w-80 h-80 bg-red-500 rounded-full blur-3xl"
            animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"
            animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Horizontal Carousel Section */}
      <div className="relative h-[400vh] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950">
          {/* 3D Canvas Background */}
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            className="absolute inset-0"
          >
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.4} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.9} color="#FF6B6B" />
            <pointLight position={[0, 0, 8]} intensity={0.6} color="#4ECDC4" />

            {countries.map((country, index) => (
              <Country3DBox
                key={index}
                country={country}
                index={index}
                progress={springProgress}
              />
            ))}
          </Canvas>

          {/* Horizontal Carousel Container */}
          <motion.div
            ref={scrollContainerRef}
            style={{ x: xTranslate }}
            className="absolute inset-0 flex w-fit"
          >
            {countries.map((country, index) => (
              <motion.div
                key={index}
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${country.gradient} pointer-events-none`}
                />

                {/* Content */}
                <motion.div
                  className="relative z-10 text-center max-w-3xl px-6 md:px-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Flag Emoji */}
                  <motion.div
                    className="text-9xl md:text-[150px] mb-8 inline-block"
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    {country.flag}
                  </motion.div>

                  {/* Country Name */}
                  <motion.h3
                    className="text-7xl md:text-9xl font-black text-white mb-6 text-balance leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {country.name}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {country.description}
                  </motion.p>

                  {/* Accent Line */}
                  <motion.div
                    className="h-1.5 w-24 md:w-40 mx-auto rounded-full mb-12"
                    style={{ backgroundColor: country.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />

                  {/* Stats Grid */}
                  <motion.div
                    className="grid grid-cols-4 gap-3 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {['50+', '25+', '12+', '∞'].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white/5 backdrop-blur-md border border-white/15 rounded-lg md:rounded-xl p-3 md:p-5 hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.08, borderColor: 'rgba(255,255,255,0.4)' }}
                      >
                        <p className="text-lg md:text-3xl font-bold text-white">
                          {stat}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          {['Projects', 'Clients', 'Years', 'Impact'][idx]}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Progress Indicator */}
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
                  <motion.div
                    className="text-gray-500 font-mono text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-700 text-lg"> / </span>
                    <span className="text-gray-600">
                      {String(countries.length).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Navigation Hint (first slide only) */}
                {index === 0 && (
                  <motion.div
                    className="absolute bottom-8 right-8 z-20 text-gray-600 font-mono text-sm flex items-center gap-2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Continue scrolling <span className="text-xl">↓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="relative py-32 px-4 text-center bg-gradient-to-t from-slate-950 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Ready to Collaborate?
          </h3>
          <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let&apos;s create something exceptional together
          </p>
          <motion.button
            className="px-10 md:px-14 py-5 md:py-6 bg-white text-slate-950 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Countries;

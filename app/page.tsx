"use client"

import { de } from "date-fns/locale"
import { describe } from "node:test"
import type React from "react"

import { useState, useEffect } from "react"

export default function ViralVFXPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 23, minutes: 59, seconds: 55 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const carouselImages = [
    { src: "/viral-vfx-course-cover-neon-effects.jpg", alt: "VFX Course Cover" },
    { src: "/video-editing-effects-tutorial.jpg", alt: "Video Editing Tutorial" },
    { src: "/social-media-content.png", alt: "Social Media Content" },
    { src: "/mobile-video-editing-capcut.jpg", alt: "Mobile Video Editing" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      nextImage()
    }
    if (touchStart - touchEnd < -75) {
      // Swiped right
      previousImage()
    }
  }

  useEffect(() => {
    const targetTime = new Date().getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 55 * 1000

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetTime - now

      if (distance < 0) {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const padNumber = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="antialiased font-inter bg-[#0a0a0a] text-[#e0e0e0]">
      {/* SECTION 1: HEADER (ETSY-STYLE PRODUCT DISPLAY) */}
      <header id="header" className="py-12 px-4 bg-black border-b border-gray-800">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Kolom Gambar Produk */}
            <div>
              <div
                className="bg-gray-800 border border-gray-700 rounded-lg aspect-square relative overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Main Image */}
                <img
                  src={carouselImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={carouselImages[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                  {currentImageIndex + 1} / {carouselImages.length}
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                {carouselImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`rounded h-20 w-20 flex-1 overflow-hidden transition-all ${currentImageIndex === index
                      ? "border-2 border-[#FE2C55] ring-2 ring-[#FE2C55]/30"
                      : "border border-gray-600 hover:border-gray-400"
                      }`}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-4"></div>
            </div>

            {/* Kolom Info Produk */}
            <div className="pt-2">
              <div className="mb-2 text-lg">
                <span>🔥 </span>
                <span className="font-bold text-orange-500">167 terjual</span>
                <span className="text-red-500"> dalam 24 jam terakhir</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Paket Viral VFX</h1>

              {/* Ulasan */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-white font-bold ml-1">5.0</span>
                <span className="text-gray-400 text-sm">(12.500+ ulasan)</span>
              </div>

              {/* Terjual */}
              <div className="text-lg text-gray-300 mb-4">
                <span className="font-bold text-white">22.500+</span> terjual
              </div>

              {/* Harga */}
              <div className="mb-5">
                <span className="text-4xl font-bold text-[#FE2C55] mr-3">$97</span>
                <span className="text-2xl text-gray-500 line-through">$497</span>
              </div>

              {/* Unduhan Instan */}
              <div className="mb-6">
                <div className="flex items-center gap-2 bg-blue-500/10 text-blue-300 px-4 py-2 rounded-lg w-full md:w-auto">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 12v1.586l-2.293 2.293a1 1 0 001.414 1.414L6 14.414V16a1 1 0 002 0v-1.586l2.293 2.293a1 1 0 001.414-1.414L9 12.414V12H4z"></path>
                    <path d="M16 8a1 1 0 01-1-1V4a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h8a1 1 0 110 2H3a3 3 0 01-3-3V4a3 3 0 013-3h10a3 3 0 013 3v3a1 1 0 01-1 1z"></path>
                  </svg>
                  <span className="font-semibold">Unduhan Instan Digital</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">
                  Akses seumur hidup ke semua materi kursus langsung setelah pembelian.
                </p>
                <div className="mt-4">
                  <img
                    src="/images/design-mode/23ae10b-f346-42ff-3218-86ba0edbd73b_Software_Box_Bundle_Sale_Top_of_fold_22_500_students_.webp"
                    alt="Product features showcase"
                    className="w-full h-auto rounded-lg border border-gray-700"
                  />
                </div>
              </div>

              {/* Stempel Garansi Emas */}
              <div className="bg-gradient-to-br from-yellow-200 to-orange-500 border-2 border-yellow-400 rounded-lg p-3 text-center mb-4 shadow-[0_4px_10px_rgba(253,224,71,0.2)]">
                <div className="text-lg font-extrabold text-amber-950 [text-shadow:1px_1px_0px_rgba(255,255,255,0.3)]">
                  Garansi Uang Kembali 30 Hari
                </div>
                <div className="text-sm font-semibold text-amber-900">Tanpa Pertanyaan Apapun</div>
              </div>

              {/* Wrapped button in flex container to center it */}
              <div className="flex justify-center">
                <a
                  href="#pricing"
                  className="inline-block w-full md:w-auto bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-center text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
                >
                  Beli Sekarang (Hemat 80%)
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2: HERO SECTION */}
      <section id="hero" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-[#ff3b3b] text-white font-bold py-1 px-3 rounded-full text-sm uppercase">
              PROMO 80% OFF
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex gap-2 justify-center mt-6 mb-8">
            {[
              { label: "HARI", value: countdown.days },
              { label: "JAM", value: countdown.hours },
              { label: "MENIT", value: countdown.minutes },
              { label: "DETIK", value: countdown.seconds },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-lg p-3 text-center min-w-[60px]">
                <span className="text-[1.75rem] font-bold text-[#25F4EE] block">{padNumber(item.value)}</span>
                <span className="text-xs uppercase text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 leading-tight mb-4">
            Sulit berkembang di media sosial?
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            JADI VIRAL & DAPATKAN <span className="text-[#FE2C55]">10K-165K VIEWS SETIAP HARI</span> Menggunakan FORMULA
            Video Scroll-Stopper Saya Untuk Memecahkan Algoritma
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Hanya dengan HP Anda dan aplikasi GRATIS (tidak perlu pengalaman atau audiens besar)
          </p>

          {/* Video Placeholder */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg aspect-video max-w-3xl mx-auto mb-8 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000 -16zm-1 11.5v-7l5 3.5-5 3.5z"></path>
              </svg>
              <p className="mt-2">Tonton Video Penjelasan</p>
              <p className="text-sm">(Placeholder Video)</p>
            </div>
          </div>

          <a
            href="#pricing"
            className="inline-block bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
          >
            Ya! Saya Siap Menjadi Viral! (HEMAT 80%)
          </a>
          <p className="text-gray-400 mt-4">Bergabunglah sebelum penawaran berakhir dan hemat $400!</p>
          <p className="text-yellow-400 font-semibold mt-6 text-lg max-w-2xl mx-auto">
            BONUS PROMO: Dapatkan akses seumur hidup tambahan ke kursus Branding, kursus Pertumbuhan Follower, Aplikasi
            IOS/Android, Asisten Konten A.I. kami, dan banyak lagi tanpa biaya tambahan.
          </p>
        </div>
      </section>

      {/* SECTION 3: TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-gray-900 px-4">
        <div className="container mx-auto max-w-5xl">
          <h3 className="text-[2.5rem] font-black leading-tight text-center mb-6">📢 22.500+ Siswa Telah Bergabung</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: '"Saya sekarang membuat konten yang membuat istri, anak-anak, dan teman-teman saya kagum! Dan melakukannya semua dari HP saya. Salah satu video saya mendapat 1,2 juta views menggunakan teknik ini!"',
                author: "Fauzan Nashir.",
              },
              {
                text: '"Ini LUAR BIASA! Saya telah membuat 2 video sejauh ini dan saya mendapat begitu banyak perhatian dari orang-orang yang tertarik dengan apa yang saya jual! Saya suka ini!"',
                author: "Larasati Putri.",
              },
              {
                text: '"Saya tidak bisa memberi tahu Anda betapa banyaknya nilai yang ada di sini. Bahkan seseorang tanpa pengalaman akan bisa mengikuti. Saya berikan ini ke putra saya yang berusia 13 tahun dan dia sudah membuat video keren!"',
                author: "Jaka A.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8">
                <div className="flex justify-center gap-1 mb-4 text-4xl">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-6">{testimonial.text}</p>
                <p className="font-bold text-white">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU'LL LEARN */}
      <section id="what-youll-learn" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[2.5rem] font-black leading-tight text-center mb-12">
            Kursus Ini Akan Menunjukkan Kepada Anda Cara Untuk:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "✅ Membuat Video yang Menghentikan Scroll",
                description: "Tanpa mempelajari perangkat lunak yang rumit atau perangkat lunak yang mahal",
                image: "/course-how-1.webp",
              },
              {
                title: "✅ Meledak dengan Penayangan dan Pengikut",
                description: "Bahkan jika Anda (saat ini) tidak memiliki audiens yang besar",
                image: "/course-how-2.webp",
              },
              {
                title: "✅ Mengembangkan Merek Anda sebagai Otoritas",
                description: "Dan bersinar di antara persaingan di industri ANDA",
                image: "/course-how-3.webp",
              },
              {
                title: "✅ Mendapatkan Kerja Sama Merek & Meraih Status Influencer",
                description: "Menggunakan konten unik yang tidak dimiliki orang lain",
                image: "/course-how-4.webp",
              },
              {
                title: "✅ Tingkatkan Keterampilan Anda dengan Cepat",
                description: "dengan meninggalkan tutorial Youtube yang tidak terorganisir",
                image: "/course-how-5.webp",
              },
              {
                title: "✅ Membuka Kunci Algoritma",
                description: "Dan temukan audiens Anda tidak peduli apa pun niche Anda",
                image: "/course-how-6.webp",
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden hover:border-[#FE2C55] transition-colors"
              >
                <div className="aspect-video bg-gray-800 relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  {/* <h3 className="text-xl text-center font-bold text-white mb-2">{item.title}</h3> */}
                  <p className="text-[#e0e0e0] text-center text-[18px] ">  <span className="font-bold">{item.title}</span> {item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: STUDENT RESULTS */}
      <section id="student-results" className="py-20 bg-gray-900 px-4 text-center">
        {/* <h2 className="text-[2.5rem] font-black leading-tight mb-6">Hasil Siswa Berbicara Sendiri!</h2> */}
        <p className=" max-w-[1204px] text-[24px] md:text-[48px] text-[#e0e0e0] mb-12 m-auto "> Hasil Siswa Berbicara Sendiri! <span className="underline font-bold text-[#25F4EE]">7.8 JUTA PENAYANGAN</span> pada salah satu pelajaran pertama</p>
        {/* <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">PENAYANGAN pada salah satu pelajaran pertama</p> */}

        <div className="container mx-auto max-w-full px-4 mb-12 m-auto">
          <div className="flex flex-wrap overflow-x-hidden gap-4 pb-4 snap-x snap-mandatory scrollbar-hide justify-center">
            {[
              { src: "/st-res-1.webp", alt: "Hasil Siswa 1" },
              { src: "/st-res-2.webp", alt: "Hasil Siswa 2" },
              { src: "/st-res-3.webp", alt: "Hasil Siswa 3" },
              { src: "/st-res-4.webp", alt: "Hasil Siswa 4" },
              { src: "/st-res-5.webp", alt: "Hasil Siswa 5" },
              { src: "/st-res-6.webp", alt: "Hasil Siswa 6" },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-[330px] rounded-lg overflow-hidden snap-center">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 6: TRUSTED BY */}
      <section id="trusted-by" className="py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-[24px] md:text-[38px]">Yang Anda Butuhkan Hanyalah Ponsel Pintar Anda dan <span className="underline text-[#25F4EE]">APLIKASI GRATIS!</span></p>
          <p className="text-[24px] md:text-[38px] italic ">*Tidak Perlu Pengalaman!</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-10">
            {[
              { image: null, title: null },
              { image: "/smart-phone-1.webp", title: "" },
              { image: "/smart-phone-2.webp", title: "Mauricio dengan mudah mencapai 3,6 Juta Penayangan + bonus $1.000 hanya dalam hitungan hari!" },
              { image: "/smart-phone-3.webp", title: "Jaren mendapatkan 1,2 Juta penayangan dan hampir 40 ribu pembagian sebagai pemula!" },
              { image: "/smart-phone-4.jpg", title: "Megan dengan cepat mencetak 854 ribu penayangan tanpa pengikut yang banyak!" },
            ].map((item, i) => (
              item.image ? (
                <div key={i} className="flex flex-col items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[800px] max-w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-gray-300 font-semibold max-w-[800px]">{item.title}</p>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING / BUNDLE */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[24px] md:text-[48px] font-bold text-center mb-2">Bergabunglah Hari Ini untuk Hemat 90% & Dapatkan Bonus Tahun Baru Eksklusif! </h2>
          <p className="text-center text-yellow-400 text-[18px] md:text-[30px] font-semibold mb-6">(PROMO BERAKHIR MALAM INI)</p>

          <img src='/save-90.png' alt='Save 90%' className='mx-auto mb-6 md:max-w-4xl rounded-lg shadow-lg border border-gray-700' />

          <div className="bg-[#111] border-2 border-[#FE2C55] rounded-xl px-4 py-10 md:p-10 max-w-4xl m-auto shadow-[0_10px_30px_rgba(254,44,85,0.1)]">


            <ul className="space-y-3 mb-8">
              {[
                "Kursus VFX Viral Pemula 7 Hari (Senilai $297)",
                "BONUS TAHUN BARU #1: Kursus Branding Viral (Senilai $197)",
                "BONUS TAHUN BARU #2: Kursus VFX Viral PRO (Senilai $197)",
                "BONUS TAHUN BARU #3: Kursus Singkat Capcut Pemula (Senilai $147)",
                "BONUS TAHUN BARU #4: Asisten Pribadi Ahli Strategi Konten AI (Senilai $127)",
                "BONUS TAHUN BARU #5: Akses Seumur Hidup Aplikasi iOS/ANDROID (Senilai $186)",
                "BONUS TAHUN BARU #6: Templat Latihan Tyler (Senilai $127)",
                "BONUS TAHUN BARU #7: Akses VIP Workshop Langsung (Senilai $497)",
                "BONUS TAHUN BARU #8: Komunitas Eksklusif (TAK TERNILAI)",
              ].map((item, i) => {
                // Detect "BONUS TAHUN BARU #<num>:" prefix (case-insensitive)
                const prefixMatch = item.match(/^(BONUS TAHUN BARU\s*#\d+:\s*)/i);
                const prefix = prefixMatch ? prefixMatch[1] : null;
                const rest = prefix ? item.slice(prefix.length) : item;

                // Split rest into main text and parentheses content (if any)
                const parenMatch = rest.match(/^(.*?)(\s*\((.*)\))?$/);
                const mainText = parenMatch ? parenMatch[1] : rest;
                const parenFull = parenMatch && parenMatch[2] ? parenMatch[2] : null;

                return (
                  <li key={i} className="flex items-center space-x-3 text-[14px] md:text-[18px]">
                    <svg
                      className="text-[#FE2C55] w-6 h-6 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>

                    <span>
                      {prefix && <span className="font-light">{prefix}</span>}

                      <span className="font-bold">{mainText}</span>
                      {parenFull && <span className="font-bold text-yellow-400 italic">{parenFull}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="text-center my-6">
              <p className="text-white-700 line-through md:text-[20px]">TOTAL NILAI: <span className="">$1825</span></p>
              <p className="text-[26px] text-white-700 my-2">HANYA <span className="line-through">$997</span></p>
              <p className="md:text-8xl font-black text-red-500 my-4">$97</p>
              <p className="text-[18px] text-white font-semibold">(Akses Seumur Hidup Instan!)</p>
            </div>
            <a
              href="#pricing"
              className="block w-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-center text-[14px] md:text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
            >
              Saya Siap Menjadi VIRAL! (Hemat 90%)
            </a>
            <div className="text-center mt-4">
              <span className="text-lg text-gray-400">Garansi Uang Kembali 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHAT YOU GET WITH THIS SALE */}
      <section id="what-you-get" className="py-16 px-4 bg-[#111]">
        <div className="container mx-auto max-w-6xl">

          {/* Bonus Course 1 */}

          <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 md:mb-[4.5rem] underline text-white">
            APA YANG ANDA DAPATKAN DENGAN <span className="text-[#FE2C55]">PROMO TAHUN BARU INI</span>
          </h2>

          <h3 className=" text-center text-2xl md:text-5xl font-semibold text-white mb-4">7 Hari Viral Creator Pemula</h3>
          <p className="text-center text-[#25F4EE] font-semibold text-2xl mb-6 italic">- Akses Seumur Hidup -</p>

          <div className="mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <img
                  src="/7-days.webp"
                  alt="Paket Kursus 7 Hari Viral Creator Pemula"
                  className="w-full max-w-lg h-auto rounded-lg"
                />
              </div>

              {/* Right: Benefits List */}
              <div>


                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white">Pelajari Efek Mudah yang Menakjubkan</span> untuk bersinar
                      melawan kompetisi & menjadi pemimpin yang dihormati di niche kamu
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white">Buat Hook yang Bikin Orang Berhenti Scroll</span> untuk
                      menarik perhatian, akhirnya diperhatikan, dan meledakkan followers kamu melampaui imajinasi
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white">Sempurna Untuk Pemula</span> apakah kamu punya 10 tahun
                      pengalaman editing atau nol!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white">Tutorial Step-By-Step</span> yang mudah diikuti, sederhana
                      untuk diterapkan, dan memberikan kamu HASIL
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Kurikulum Kursus <span className="text-[#FE2C55]">10 Hari</span>
            </h3>
            <div className="space-y-16 md:space-y-20">
              {[
                {
                  day: "Hari 1",
                  title: "Pelajari Dasar-Dasarnya",
                  points: [
                    "Aplikasi & Perlengkapan Esensial",
                    "Rekomendasi Perlengkapan untuk semua anggaran",
                    "Pengaturan Kamera Terbaik",
                    "2 prinsip utama efek visual yang Anda butuhkan untuk meningkatkan level konten Anda dengan cepat (semua pemula wajib mempelajari ini)",
                  ],
                  image: "/day-1.webp",
                },
                {
                  day: "Hari 2",
                  title: "Tugas Pertama Anda",
                  points: [
                    "Memahami Segitiga Efek Visual (dan mengapa hal ini membuat pembuatan konten yang keren menjadi sederhana)",
                    "Cara menerapkan prinsip-prinsip sederhana ini ke video pertama Anda menggunakan templat saya",
                  ],
                  image: "/day-2.webp",
                },
                {
                  day: "Hari 3",
                  title: "Membuat Objek Muncul",
                  points: [
                    "Pelajari cara membuat objek apa pun muncul hanya dengan jentikan jari",
                    "Cara menggunakan efek ini untuk objek yang lebih besar, seperti memunculkan mobil, hewan peliharaan, atau orang (sangat menyenangkan dan menarik bagi penonton!)",
                  ],
                  image: "/day-3.webp",
                },
                {
                  day: "Hari 4",
                  title: "Buat Kloning Pertama Anda",
                  points: [
                    "Buat duplikat diri Anda sendiri atau orang lain",
                    "5 cara menarik untuk menggunakan efek ini untuk mempromosikan merek Anda",
                    "Contoh kloning siswa yang hebat (berdebat dengan kloning mereka, mengajari trik kepada kloning mereka, menunjukkan produk atau layanan kepada kloning mereka, + banyak lagi!)",
                  ],
                  image: "/day-4.webp",
                },
                {
                  day: "Hari 5",
                  title: "Muncul Dari Sebuah Objek",
                  points: [
                    "Secara ajaib membuat cairan atau koin mengucur dari objek apa pun",
                    "Cara menerapkan efek yang simpel dan mudah ini ke konten untuk audiens spesifik ANDA",
                    "3 Ide sederhana untuk menggunakan efek ini dalam video yang dapat Anda unggah sekarang (niche apa pun!)",
                  ],
                  image: "/day-5.webp",
                },
                {
                  day: "Hari 6",
                  title: "Transformasi Objek",
                  points: [
                    "Mengubah satu objek menjadi objek lain",
                    "Transisi dua objek apa pun dengan mulus untuk membuat video menawan yang terasa seperti sulap bagi audiens Anda",
                    "Cara menggunakan efek ini untuk membuat video yang INGIN dibagikan orang-orang kepada teman mereka",
                  ],
                  image: "/day-6.webp",
                },
                {
                  day: "Hari 7",
                  title: "Transisi Tiang Ajaib (Magic Pole Transition)",
                  points: [
                    "Transisi dari satu pakaian ke pakaian lainnya",
                    "Transisi satu objek menjadi objek lainnya",
                    "Bagaimana siswa saya menggunakan efek ini untuk membuat video yang mudah ditonton berulang kali (algoritma sangat menyukai ini!)",
                  ],
                  image: "/day-7.webp",
                },
                {
                  day: "HARI 8",
                  title: "Efek Kecepatan Time Warp",
                  points: [
                    "Buat efek time warp yang luar biasa (kendalikan cuaca di langit, sambil tetap berada pada kecepatan normal)",
                    "Cara menggunakan efek ini untuk menunjukkan berlalunya waktu & membuat video emosional yang menyentuh audiens Anda",
                  ],
                  image: "/day-8.webp",
                },
                {
                  day: "HARI 9",
                  title: "Transisi Vertikal",
                  points: [
                    "Buat transisi vertikal yang menawan dengan cepat",
                    "Cara menggunakan efek ini untuk mengubah warna pakaian Anda, membuat objek muncul di tangan Anda, atau membuat anjing Anda muncul entah dari mana",
                    "5 aplikasi teratas dari efek ini yang disukai siswa saya (anggota keluarga yang muncul, hewan peliharaan yang menghilang, logo yang muncul di baju, + banyak lagi)",
                  ],
                  image: "/day-9.webp",
                },
                {
                  day: "HARI 10",
                  title: "Pengungkapan Objek (Object Reveal)",
                  points: [
                    "Buat objek atau teks muncul seperti sulap",
                    "Jenis objek atau kutipan terbaik untuk diungkapkan demi keterlibatan (engagement) maksimal",
                    "Cara menggunakan efek ini untuk mengungkapkan produk atau layanan Anda & meninggalkan kesan mendalam pada penonton",
                  ],
                  image: "/day-10.webp",
                },
              ].map((lesson, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1 space-y-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{lesson.day.toUpperCase()}:</h4>
                      <h5 className="text-2xl md:text-3xl font-bold text-white pb-4 border-b border-gray-800/50">
                        {lesson.title}
                      </h5>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {lesson.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded bg-[#25F4EE]/20 flex items-center justify-center mt-1">
                            {/* <svg
                              className="w-3 h-3 text-[#25F4EE]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg> */}
                            ▶️
                          </div>
                          <span className="text-gray-300 text-sm md:text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                      <img
                        src={lesson.image || "/placeholder.svg"}
                        alt={lesson.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-800/50 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Bonus Course 2 */}

          <h2 className="text-center text-2xl md:text-5xl font-semibold text-white mb-4 mt-[6rem]">
            KURSUS BONUS #2: <span className="text-[#FE2C55]"> Branding Viral</span>
          </h2>

          <p className="text-center text-[#25F4EE] font-semibold text-2xl mb-6 italic">- Akses Seumur Hidup -</p>

          <div className="mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <img
                  src="/bc2main.webp"
                  alt="Branding Viral"
                  className="w-full max-w-lg h-auto rounded-lg"
                />
              </div>

              {/* Right: Benefits List */}
              <div>


                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span>  Pelajari Metode Rahasia yang saya gunakan untuk Melejitkan lebih dari 500 ribu Pengikut hanya dalam 6 Bulan

                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Bangun Merek Anda dan jadilah otoritas yang dicintai di bidang Anda                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Pasarkan Bisnis Anda di Media Sosial menggunakan metode pertumbuhan 10x rahasia saya

                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Tampil Menonjol dari Kompetitor Anda

                    </span>

                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span>Gunakan Bot AI Kustom saya untuk menghemat waktu Anda</span>

                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            {/* <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Kurikulum Kursus <span className="text-[#FE2C55]">10 Hari</span>
            </h3> */}
            <div className="space-y-16 md:space-y-20">
              {[
                {
                  day: "Hari 1",
                  title: "Strategi Branding Media Sosial",
                  points: [
                    "3 Pilar utama untuk merek yang sukses di tahun 2024 dan seterusnya",
                    "5 rahasia saya untuk tampil menonjol sebagai otoritas dan menjadi pemimpin di niche yang padat",
                    "Konten spesifik apa yang harus dibuat dan seberapa sering harus mengunggah berdasarkan tujuan branding spesifik Anda",
                  ],
                  image: "/day-11.webp",
                },
                {
                  day: "Hari 2",
                  title: "Optimalisasi Profil",
                  points: [
                    "Kunci #1 dalam memberi nama profil Anda (ini WAJIB untuk branding)",
                    "Cara membuat bio yang menghasilkan konversi",
                    "Mengapa \"Highlight Reels yang Wajib Diklik\" sangat penting dan cara mengaturnya",
                    "Daftar Periksa Optimalisasi Profil",
                  ],
                  image: "/day-12.webp",
                },
                {
                  day: "Hari 3",
                  title: "Bot AI Kustom",
                  points: [
                    "Susun Strategi Konten yang sempurna untuk audiens Anda menggunakan bot AI kustom saya",
                    "Apa itu \"Bank Hook Viral\" dan cara membuatnya menggunakan templat AI saya",
                    "Bagaimana saya berubah dari kebingungan menjadi kejelasan total tentang branding saya menggunakan AI (dan cara meniru pekerjaan saya)",
                  ],
                  image: "/day-13.webp",
                },
                {
                  day: "Hari 4",
                  title: "Strategi Konten Viral yang Sempurna",
                  points: [
                    "4 Tips Strategi Konten teratas untuk Pertumbuhan Viral (berhasil di niche atau industri apa pun)",
                    "Formula Hook Dinamis Rahasia saya & Cetak Biru Konten untuk Keterlibatan (Engagement) Maksimal",
                    "Daftar Periksa Mengunggah Video untuk Keterlibatan Viral (7 hal yang selalu saya periksa sebelum mengunggah!)",
                    "Cara memahami dan meretas algoritma secara etis untuk keterlibatan yang MASIF",
                  ],
                  image: "/day-14.webp",
                },

              ].map((lesson, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1 space-y-4">
                    <div>
                      {/* <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{lesson.day.toUpperCase()}:</h4> */}
                      <h5 className="text-2xl md:text-3xl font-bold text-white pb-4 border-b border-gray-800/50">
                        {lesson.title}
                      </h5>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {lesson.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded bg-[#25F4EE]/20 flex items-center justify-center mt-1">
                            {/* <svg
                              className="w-3 h-3 text-[#25F4EE]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg> */}
                            ▶️
                          </div>
                          <span className="text-gray-300 text-sm md:text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                      <img
                        src={lesson.image || "/placeholder.svg"}
                        alt={lesson.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-800/50 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Bonus Course 3 */}

          <h2 className="text-center text-2xl md:text-5xl font-semibold text-white mb-4 mt-[6rem]">
            KURSUS BONUS #3: <span className="text-[#FE2C55]">Viral VFX PRO</span>
          </h2>

          <p className="text-center text-[#25F4EE] font-semibold text-2xl mb-6 italic">- Akses Seumur Hidup -</p>

          <div className="mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <img
                  src="/bc3main.webp"
                  alt="Viral VFX PRO"
                  className="w-full max-w-lg h-auto rounded-lg"
                />
              </div>

              {/* Right: Benefits List */}
              <div>


                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span>Pelajari Lebih BANYAK Lagi Efek yang Disukai Orang-orang & Tingkatkan Keterampilan Anda ke Level Berikutnya


                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Buat Efek yang Menarik Perhatian untuk Mempromosikan Bisnis dan Produk Anda</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Gunakan AI untuk mempercepat proses pengeditan</span>
                  </li>
                  <li className="flex items-start gap-3">

                    <span className="text-gray-300">
                      <span className="font-bold text-white pl-2 pr-5">+</span> Buat Permintaan Khusus untuk konten dan tutorial!

                    </span>

                  </li>

                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            {/* <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Kurikulum Kursus <span className="text-[#FE2C55]">10 Hari</span>
            </h3> */}
            <div className="space-y-16 md:space-y-20">
              {[

                {
                  title: "Efek Kekuatan Super",
                  points: [
                    "Terbang Seperti Superman",
                    "Portal Dr. Strange",
                    "Efek Kecepatan Flash",
                    "Lompatan Gedung",
                    "Jaring Spiderman",
                  ],
                  image: "/day-15.webp",
                },
                {
                  title: "Kloning Lanjutan",
                  points: [
                    "Lebih Banyak Kloning = Lebih Menyenangkan!",
                    "Duplikat diri Anda lebih dari satu kali",
                    "Menciptakan interaksi dinamis yang memikat penonton dan membuat mereka terus menonton (pilihannya tidak terbatas!)",
                  ],
                  image: "/day-16.webp",
                },
                {
                  title: "Efek Jentikan (Flick Effect)",
                  points: [
                    "Jentikkan diri Anda untuk bersenang-senang",
                    "Menyenangkan bagi penonton untuk ditonton berulang kali (yang sangat disukai algoritma)",
                    "Sempurna untuk membuat orang tersenyum, tertawa, dan kembali lagi",
                  ],
                  image: "/day-17.webp",
                },
                {
                  title: "Pengungkapan Objek (Object Reveal)",
                  points: [
                    "Buat objek dan teks muncul",
                    "Ungkapkan produk Anda atau kutipan penting",
                    "Pastikan audiens Anda membaca kata-kata Anda",
                    "Tinggalkan kesan mendalam di benak penonton",
                  ],
                  image: "/day-18.webp",
                },
                {
                  title: "Penggantian Langit (Sky Replacement)",
                  points: [
                    "Ganti langit dengan visual yang epik",
                    "Menarik perhatian penonton secara instan",
                    "Transisi badai yang menciptakan dampak emosional yang kuat pada audiens Anda",
                  ],
                  image: "/day-19.webp",
                },
                {
                  title: "Masih Banyak Lagi Efek Lainnya",
                  points: [
                    "Teruslah memukau teman, keluarga, dan penggemar Anda!",
                    "Lompatan Cangkir (Cup Jump)",
                    "Tukar Subjek (Subject Swap)",
                    "Pakaian Terbang Masuk",
                    "Ganti Background Cepat (BG Quick Swap)",
                    "Timelapse Luar Biasa",
                    "Pembekuan Waktu (Time Freeze)",
                    "Efek Green Screen",
                    "+ Efek baru selalu ditambahkan!",
                  ],
                  image: "/day-20.webp",
                },

              ].map((lesson, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <div className="order-2 lg:order-1 space-y-4">
                    <div>
                      {/* <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{lesson.day.toUpperCase()}:</h4> */}
                      <h5 className="text-2xl md:text-3xl font-bold text-white pb-4 border-b border-gray-800/50">
                        {lesson.title}
                      </h5>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {lesson.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded bg-[#25F4EE]/20 flex items-center justify-center mt-1">
                            {/* <svg
                              className="w-3 h-3 text-[#25F4EE]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg> */}
                            ▶️
                          </div>
                          <span className="text-gray-300 text-sm md:text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative aspect-video w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                      <img
                        src={lesson.image || "/placeholder.svg"}
                        alt={lesson.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-800/50 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Bonus Course 4 */}


          <div className="text-center font-semibold text-white  mt-[6rem]">
            <p className="text-2xl md:text-5xl">
              KURSUS BONUS #4
            </p>
            <p className="text-[#FE2C55] text-2xl md:text-5xl py-6">
              Kursus Singkat Capcut Pemula
            </p>
            <p className="text-3xl font-semibold" >
              (Perangkat Lunak Gratis Opsional)
            </p>
          </div>


          <div className="mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <img
                  src="/bc4main.webp"
                  alt="Viral VFX PRO"
                  className="w-full max-w-lg h-auto rounded-lg"
                />
              </div>

              {/* Right: Benefits List */}
              <div>


                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span>Berubah dari pemula menjadi ninja pengeditan di CAPCUT bahkan jika Anda tidak paham teknologi dan buruk dalam mengedit (Aplikasi GRATIS #1)


                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Buat video yang luar biasa baik di ponsel maupun desktop Anda
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Tambahkan musik, efek suara, teks (caption), B-roll, dan banyak lagi dengan mudah dan tanpa usaha untuk membawa konten Anda ke level berikutnya</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      <span className="font-bold text-white"></span> Hasilkan konten media sosial berkualitas tinggi dengan cepat untuk menarik perhatian jutaan orang</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bonus Course 5 */}

          <div className="text-center font-semibold text-white  mt-[6rem]">
            <p className="text-2xl md:text-5xl">
              BONUS #5
            </p>
            <p className="text-[#FE2C55] text-2xl md:text-5xl py-6">
              Asisten Pribadi Strategi Konten A.I.
            </p>
            <p className="text-3xl font-semibold" >
              - Akses Seumur Hidup -
            </p>
          </div>

          <div className="mt-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Product Image */}
              <div className="flex justify-center">
                <img
                  src="/bc5main.webp"
                  alt="Viral VFX PRO"
                  className="w-full max-w-lg h-auto rounded-lg"
                />
              </div>

              {/* Right: Benefits List */}
              <div>


                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      
                      Berubah dari pemula menjadi ninja pengeditan di CAPCUT bahkan jika Anda tidak paham teknologi dan buruk dalam mengedit (Aplikasi GRATIS #1)
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      
                      Secara instan memberikan strategi konten yang sempurna untuk niche dan audiens unik ANDA, sehingga Anda selalu tahu persis apa yang harus diunggah untuk mendapatkan pertumbuhan media sosial yang terasa luar biasa!
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      
                      Menghasilkan daftar HOOK VIRAL dengan cepat yang akan langsung menarik perhatian dan membuat penonton Anda ketagihan dengan konten Anda
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      
                      Panduan langkah-demi-langkah tentang cara menyusun struktur reels Anda sehingga Anda tampil menonjol dan mendapatkan jutaan pasang mata pada merek Anda
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="text-[#25F4EE] w-6 h-6 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">
                      
                      Menghasilkan teks (caption) yang sempurna untuk unggahan Anda setiap saat, sehingga konten Anda dijamin mendapatkan keterlibatan (engagement) sebanyak mungkin
                    </span>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          {/* Bonus Course 6 */}

    

        </div>
      </section>

      <section id="trusted-by" className="py-12 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-[24px] md:text-[38px]">BERFUNGSI DI SEMUA PERANGKAT</p>
          <p className="text-[24px] md:text-[38px] italic ">Dan Perangkat Lunak Pengeditan APA PUN!</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-10">
            {[
              { image: null, title: null },
              { image: "/woa-1.webp", title: "" },
              { image: "/woa-2.webp", title: "Berhasil untuk Pemilik Bisnis, Kreator Konten, dan Influencer di NICHE APA PUN!" },
              { image: "/woa-3.webp", title: "Dan Anda TIDAK Membutuhkan Pengikut yang Banyak!" },
            ].map((item, i) => (
              item.image ? (
                <div key={i} className="flex flex-col items-center gap-4">
                  <p className="text-center text-gray-300 text-3xl mb-6 font-semibold max-w-[800px]">{item.title}</p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[800px] max-w-full h-auto rounded-lg"
                  />
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>


      <section id="new-year-sale-bonuses" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[2.5rem] font-black leading-tight text-center mb-12">
            BONUS PENJUALAN <span className="text-[#FE2C55]">TAHUN BARU</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              {
                image: "/nysale-1.webp",
                title: "Komunitas VIP Pribadi",
                description: "Dapatkan jawaban atas semua pertanyaan Anda 24/7 dalam grup pribadi sehingga Anda tidak pernah menebak-nebak atau membuang waktu! (nilai: TAK TERNILAI)",
              },
              {
                image: "/nysale-2.webp",
                title: "File Video Tyler",
                description: "Saya menyediakan file yang telah saya rekam untuk proyek-proyek ini, sehingga Anda dapat berlatih editing tanpa perlu merekam! (nilai $127)",
              },
              {
                image: "/nysale-3.jpg",
                title: "Akses Langsung ke Pro Industri",
                description: "Ini adalah sesuatu yang akan menghemat banyak waktu Anda. Saya jamin saya tahu jawaban atas semua pertanyaan Anda! (nilai: TAK TERNILAI)",
              },
              {
                image: "/nysale-4.webp",
                title: "Workshop Langsung",
                description: "Dapatkan Pelatihan Langsung dan T&J dari Tyler! (nilai $497)",
              },
              {
                image: "/nysale-5.webp",
                title: "Penawaran 3 untuk 1",
                description: "Akses seumur hidup dan semua pembaruan di masa mendatang ke 3 kursus terpopuler saya! (nilai $497)",
              },
            ].map((bonus, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden hover:border-[#FE2C55] transition-colors">
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img src={bonus.image || "/placeholder.svg"} alt={bonus.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{bonus.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{bonus.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl text-gray-300 mb-6 font-semibold">
              Tidak Perlu Pengalaman!
            </p>
            <a
              href="#pricing"
              className="inline-block bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
            >
              Ya, Saya Ingin Penawaran Ini Sebelum Hilang! (Hemat 90%)
            </a>
          </div>
        </div>
      </section>


      <section id="community-reviews" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-[2.5rem] font-black leading-tight text-center mb-4">
            Bergabunglah dengan Komunitas Kami yang Inspiratif dan Aktif dengan Lebih dari 22.500+ Siswa yang Puas!
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12">
            Lihat apa yang mereka katakan! 👇
          </p>

          {/* Video Section */}
          <div className="mb-16">
            <div className="bg-gray-800 border border-gray-700 rounded-lg aspect-video max-w-4xl mx-auto mb-8 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000 -16zm-1 11.5v-7l5 3.5-5 3.5z"></path>
                </svg>
                <p className="mt-2">Testimonial Video dari Siswa</p>
                <p className="text-sm">(Placeholder Video)</p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
              name: "Siti Rahmawati",
              text: "Course ini benar-benar mengubah segalanya buat saya. Video saya naik dari 100 views ke 50 ribu+ cuma dalam 2 minggu.",
              rating: 5,
              },
              {
              name: "James K.",
              text: "Everything is explained in a very simple way. Nggak ada jargon ribet, langsung ke praktik dan hasilnya kelihatan.",
              rating: 5,
              },
              {
              name: "Maria Lestari",
              text: "Dari nol soal editing sampai bisa bikin konten yang viral. Tutorialnya step-by-step dan gampang banget diikutin.",
              rating: 5,
              },
              {
              name: "David Pratama",
              text: "Best investment I've made buat bisnis saya. Efek VFX yang diajarin bener-bener game-changing buat promosi produk.",
              rating: 5,
              },
              {
              name: "Emma Putri",
              text: "Community support-nya kuat banget. Kalau ada pertanyaan, biasanya langsung dapat jawaban cepat di private group.",
              rating: 5,
              },
              {
              name: "Chris Santoso",
              text: "Awalnya ragu bisa ngikutin, but the beginner course made everything feel simple. Sekarang udah mulai planning video selanjutnya.",
              rating: 5,
              },
            ].map((review, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(review.rating)].map((_, j) => (
                <svg key={j} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
              <p className="font-bold text-white">— {review.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#pricing"
              className="inline-block bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
            >
              Join the Community and Go Viral Now! (90% Off!)
            </a>
          </div>
        </div>
      </section>
















      <section id="trusted-by" className="py-12 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-[24px] md:text-[38px]">Apa Saja yang Termasuk dalam Kursus</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-10">
            {[
              { image: null, title: null },
              { image: "/wic-1.jpg", title: "Ini Tutorial Video yang Sarat Nilai", description: "Kursus ini mencakup banyak sekali video yang sarat akan nilai. Anda juga akan mempelajari cara membuat Efek Visual Viral yang menarik perhatian dari para influencer dan merek ternama, memberikan Anda persediaan teknik viral yang tidak terbatas yang dapat diterapkan pada NICHE atau industri APA PUN." },
              { image: "/wic-2.jpg", title: "Formula Hook dan Retensi", description: "Pelajari teknik rahasia untuk membuat video yang menghentikan scroll yang membuat penonton Anda kagum! Pahami apa yang diperlukan untuk menahan perhatian mereka dan meningkatkan waktu tonton Anda, yang mengarah pada lebih banyak penayangan, eksposur, dan pertumbuhan!" },
              // { image: "/wic-3.jpg", title: "Komunitas Pribadi", description: "Di sinilah perbedaan kami dengan kursus lain atau belajar di YouTube. Menjadi bagian dari komunitas orang-orang dengan pemikiran serupa tidak hanya memberi Anda kesempatan untuk mengajukan pertanyaan dan mendapatkan kejelasan, tetapi juga menjamin kesuksesan yang lebih cepat bagi Anda!" },
            ].map((item, i) => (
              item.image ? (
                <div key={i} className="flex flex-col items-center gap-4 mb-8">
                  <p className="text-center text-gray-300 text-3xl mb-6 font-semibold max-w-[800px]">{item.title}</p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[800px] max-w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-gray-400 text-lg mt-4 max-w-[800px]">{item.description}</p>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>


























      {/* SECTION 11: COMMUNITY / GUIDES */}
      <section id="community-guides" className="py-20 bg-gray-900 px-4">
        <div className="container mx-auto max-w-4xl text-center">

          <h2 className="text-[2.5rem] font-black leading-tight mt-16 mb-6">
            Panduan Langkah Demi Langkah untuk Memastikan Anda Berhasil!
          </h2>
          <div className="bg-gray-800  rounded-lg flex items-center justify-center text-gray-500 max-w-2xl mx-auto">
            <img src="/sysguide.gif" alt="Guides" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* SECTION 12: WHO THIS IS FOR */}
      <section id="who-this-is-for" className="py-20 px-4">
        <h1 className="text-center text-6xl max-w-5xl mb-8 mx-auto font-bold " >Panduan Langkah Demi Langkah untuk Memastikan Anda Berhasil!</h1>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-[2.5rem] font-black leading-tight text-center mb-12">Untuk Siapa Kursus Ini</h2>
          <ul className="space-y-4 text-lg max-w-2xl mx-auto">
            {[
              'Anda adalah seorang yang bersemangat <span class="font-bold text-white">mengejar tujuan (go-getter)</span>',
              'Anda ingin <span class="font-bold text-white">menghemat waktu dan uang</span>',
              'Anda ingin konten Anda <span class="font-bold text-white">tampil menonjol</span>',
              'Anda ingin <span class="font-bold text-white">mengembangkan bisnis Anda</span>',
              'Anda <span class="font-bold text-white">menghargai waktu</span> dan mengikuti rencana yang terbukti',
              'Anda ingin <span class="font-bold text-white">meningkatkan keterampilan pengeditan</span> Anda (Capcut, Premier Pro, Davinci Resolve, atau program APAPUN)',
              'Niche apa pun yang ingin <span class="font-bold text-white">meningkatkan video mereka</span>',
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-3">
                <svg
                  className="text-[#FE2C55] w-6 h-6 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section id="final-cta" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <img src='/wtc.png' alt='Save 90%' className='mx-auto mb-6 rounded-lg shadow-lg border border-gray-700' />
          <div className="bg-[#111] border-2 border-[#FE2C55] rounded-xl p-10 shadow-[0_10px_30px_rgba(254,44,85,0.1)]">

            <h2 className="text-3xl font-bold text-center mb-2">
              PROMO <span className="text-[#FE2C55]">TAHUN BARU</span>

            </h2>
            <p className="text-center text-yellow-400 font-semibold mb-6">Penawaran Waktu Terbatas</p>
            {/* <div className="text-center my-6">
              <p className="text-gray-400 text-lg">TOTAL NILAI: $1825</p>
              <p className="text-6xl font-black text-white my-2">HANYA $97</p>
              <p className="text-2xl font-bold text-red-500 line-through">$497</p>
              <p className="text-lg text-white font-semibold">(Pembayaran Sekali Saja)</p>
            </div> */}
            <div className="text-center my-6">
              <p className="text-white-700 line-through md:text-[20px]">TOTAL NILAI: <span className="">$1825</span></p>
              <p className="text-[26px] text-white-700 my-2">HANYA <span className="line-through">$997</span></p>
              <p className="md:text-8xl font-black text-red-500 my-4">$97</p>
              <p className="text-[18px] text-white font-semibold">Hemat 90% Hari Ini!</p>
              <p className="text-[18px] text-white font-semibold">Pembayaran Satu Kali</p>
              <p className="text-[18px] text-white font-semibold">Jaminan Uang Kembali 100%</p>

            </div>
            <a
              href="#pricing"
              className="block w-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-center text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)]"
            >
              Ambil Penawaran Ini & Jadi Viral Sekarang! (DISKON 90%)
            </a>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-400">Garansi Uang Kembali 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-[2.5rem] font-black leading-tight text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: "Apakah saya perlu pengalaman sebelumnya?",
                a: "Beberapa pengalaman dengan editing direkomendasikan. Namun, tidak perlu, selama Anda memiliki keinginan untuk belajar dan sedikit kesabaran.",
              },
              {
                q: "Berapa lama saya mendapatkan akses?",
                a: "Bagaimana dengan akses seumur hidup? Setelah mendaftar, Anda memiliki akses tak terbatas ke program ini selama yang Anda suka.",
              },
              {
                q: "Program editing apa yang Anda bahas? Hanya Capcut?",
                a: "Saya secara khusus menunjukkan tutorial untuk Capcut (menggunakan HP) dan Premier Pro (desktop). Tetapi Anda dapat menggunakan software editing apa pun pilihan Anda karena begitu Anda memahami prinsipnya, mereka berlaku di semua platform! Kami memiliki siswa yang menggunakan Adobe Premiere, Filmora, Final Cut, dll.",
              },
              {
                q: "Bisakah saya mempelajari semua ini di Youtube?",
                a: "Ya, dan Tidak. Materi disajikan secara berurutan dan dengan cara paling strategis untuk membangun kepercayaan diri Anda dalam 10 hari. Jika tidak, Anda harus siap menghabiskan berjam-jam online mencari setiap topik. Juga, menjadi bagian dari komunitas pribadi yang berkembang.",
              },
              {
                q: "Apakah ada jaminan?",
                a: "Tentu saja. Kami memiliki jaminan uang kembali 14 hari! Jika Anda tidak puas karena alasan apa pun, Anda dapat meminta uang Anda kembali penuh dalam 14 hari setelah pembelian.",
              },
              {
                q: "Apakah ini bisa berfungsi untuk niche saya?",
                a: "Efek yang diajarkan dalam kursus paling baik digunakan untuk melengkapi video Anda saat ini dan mengubahnya menjadi 'scroll stopper' yang menarik. Jadi ya, sebagian besar efek dapat dengan mudah digunakan untuk niche apa pun dan sudah ada beragam siswa dari semua industri yang berbeda.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-lg border border-[#333]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-6 h-6 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>

          <div className="mt-12 mx-auto max-w-5xl text-center">
            <img src='/mbg.webp' alt='FAQ Image' className='mx-auto rounded-lg' />
            <h3 className="text-center text-3xl font-bold mt-4">Apakah ada jaminan?</h3>
            <p className="text-center text-gray-400 mt-4">Tentu saja. Kami memiliki jaminan uang kembali 14 hari! Jika Anda tidak puas karena alasan apa pun, Anda dapat meminta pengembalian uang penuh dalam waktu 14 hari setelah pembelian.</p>
          <a
              href="#pricing"
              className="inline-block bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-[0_4px_15px_rgba(254,44,85,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(254,44,85,0.5)] m-auto mt-8"
            >
              Ya, Saya Ingin Penawaran Ini Sebelum Hilang! (Hemat 90%)
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 15: FOOTER */}
      <footer id="footer" className="py-12 border-t border-gray-800 px-4">
        <div className="container mx-auto max-w-5xl text-center text-gray-500 text-sm">
          <p className="mb-4">© 2023 vfxCreators. Seluruh hak cipta.</p>
          <p className="mb-4">
            Dengan mengunjungi halaman ini, Anda menyetujui syarat dan ketentuan, kebijakan privasi & sanggahan penghasilan.
          </p>
          <p className="mb-4">Situs ini bukan bagian dari situs web Facebook atau Facebook Inc. Selain itu, situs ini TIDAK didukung oleh Facebook dengan cara apa pun. FACEBOOK adalah merek dagang dari FACEBOOK, Inc.


          </p>
          <p>
            SANGGAHAN (DISCLAIMER): Angka penjualan yang tertera di halaman arahan ini dan yang dibahas dalam program Viral VFX adalah angka penjualan pribadi kami dan dalam beberapa kasus merupakan angka penjualan dari klien terdahulu atau yang sudah ada. Harap dipahami bahwa hasil ini tidak tipikal. Kami tidak menyiratkan bahwa Anda akan menduplikasi hasil tersebut (atau melakukan apa pun dalam hal tersebut). Rata-rata orang yang membeli informasi "cara melakukan sesuatu" mendapatkan sedikit atau bahkan tidak ada hasil sama sekali. Kami menggunakan referensi ini hanya untuk tujuan contoh. Hasil Anda akan bervariasi dan bergantung pada banyak faktor termasuk namun tidak terbatas pada latar belakang, pengalaman, dan etos kerja Anda. Semua bisnis mengandung risiko serta membutuhkan upaya dan tindakan yang masif dan konsisten. Jika Anda tidak bersedia menerima hal tersebut, mohon TIDAK MEMBELI KURSUS Viral VFX.
          </p>
        </div>
      </footer>
    </div>
  )
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PillarItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FabricItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  badgeColor?: string;
  actionText: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: 'Koleksi Hijab' | 'Layanan Atelier';
  price: number;
  priceFormatted: string;
  description: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  thumbnail: string;
  thumbnailAlt: string;
}

export const siteConfig = {
  name: 'Astalica',
  legalName: 'Astalica Modest Atelier Indonesia',
  tagline: 'Kemurnian Anggun, Kemewahan Modest Indonesia',
  slogan: 'Kemewahan Kesantunan dalam Setiap Helai',
  category: 'Fashion Muslim & Hijab Haute Couture',
  shortDescription: 'Bisnis Hijab Kecil-kecilan dengan sentuhan adibusana santun berkelas internasional.',
  description:
    'Menghadirkan koleksi hijab sutra premium dan busana santun berkelas haute couture dengan sentuhan mahakarya tekstil nusantara dan kenyamanan tanpa kompromi.',
  logo: '/images/logo.svg',
  
  qris: {
    image: '/images/astalica-qris.svg',
    merchantName: 'ASTALICA HAUTE MODESTY',
    nmid: 'ID1026092026888',
    bank: 'BCA / Mandiri / QRIS Multi-Payment',
    accountNumber: '8830-1928-33',
    accountHolder: 'Atelier Astalica Modest',
  },

  catalog: [
    {
      id: 'hijab-mulberry-signature',
      name: 'Hijab Sutera Mulberry 6A (Signature Series)',
      category: 'Koleksi Hijab',
      price: 385000,
      priceFormatted: 'Rp 385.000',
      description: 'Serat sutra mulberry murni 19 momme dengan kilau satin lembut dan tepian jahit tangan artisan.',
      image: '/images/fabric-satin.webp',
    },
    {
      id: 'hijab-voile-parisien',
      name: 'Fine Voile de Luxe Parisian Drape',
      category: 'Koleksi Hijab',
      price: 275000,
      priceFormatted: 'Rp 275.000',
      description: 'Bahan voile premium berpori mikro yang tegak di dahi dan sejuk untuk pemakaian formal seharian.',
      image: '/images/fabric-voile.webp',
    },
    {
      id: 'hijab-chiffon-royale',
      name: 'Pashmina Chiffon Crepe Royale Handwoven',
      category: 'Koleksi Hijab',
      price: 450000,
      priceFormatted: 'Rp 450.000',
      description: 'Pashmina drape panjang dengan tekstur butir pasir mewah dan aksen monogram emas Astalica.',
      image: '/images/fabric-chiffon.webp',
    },
    {
      id: 'layanan-bespoke-bridal',
      name: 'Bespoke Bridal Hijab & Custom Veil (Reservasi)',
      category: 'Layanan Atelier',
      price: 1500000,
      priceFormatted: 'Rp 1.500.000',
      description: 'Sesi kurasi kerudung pengantin eksklusif bertabur kristal swarovski dan bordir monogram khusus.',
      image: '/images/about-gallery.webp',
    },
    {
      id: 'layanan-private-styling',
      name: 'Private Styling & Personal Harmony Session (Reservasi)',
      category: 'Layanan Atelier',
      price: 750000,
      priceFormatted: 'Rp 750.000',
      description: 'Konsultasi 1-on-1 analisis palet wastra, bentuk wajah, dan padu padan adibusana bersama stylist senior.',
      image: '/images/about-textile.webp',
    },
  ] as CatalogItem[],

  about: {
    badge: 'TENTANG KAMI • FILOSOFI ASTALICA',
    heading: 'Menghidupkan Kemegahan Adibusana Santun',
    paragraph1:
      'Lahir dari penghormatan mendalam terhadap keanggunan perempuan berhijab, Astalica memadukan tradisi tenun mulia Nusantara dengan estetika kontemporer adibusana internasional. Kami percaya bahwa berbusana santun adalah bentuk tertinggi dari rasa percaya diri, martabat, dan rasa syukur.',
    paragraph2:
      'Setiap jalinan serat tidak sekadar dirancang untuk menutupi, melainkan untuk membingkai ekspresi jiwa dengan kelembutan yang menyentuh hati. Melalui proses kurasi bahan bersertifikat dan tangan-tangan terampil para perajin lokal, kami mempersembahkan karya yang melintasi tren zaman.',
    quote: {
      text: 'Kesantunan bukan tentang membatasi keindahan, melainkan memilih untuk memancarkannya dengan cara yang paling mulia dan berwibawa.',
      author: 'Tim Desain Astalica Atelier',
    },
    images: {
      textile: '/images/about-textile.webp',
      textileAlt: 'Perajin Astalica memeriksa serat kain sutra mulberry murni',
      gallery: '/images/about-gallery.webp',
      galleryAlt: 'Model busana modest adibusana hijau zamrud dengan kerudung emas',
    },
    pillars: [
      {
        id: 'pillar-1',
        icon: 'eco',
        title: 'Serat Sutra Organik Pilihan',
        description:
          'Ditenun dari 100% serat alami mulberry grade 6A yang sejuk, breathable, dan jatuh sempurna di kepala tanpa rasa gerah sepanjang hari.',
      },
      {
        id: 'pillar-2',
        icon: 'architecture',
        title: 'Presisi Jahitan & Laser Cut Couture',
        description:
          'Setiap helai tepian hijab diselesaikan dengan teknologi laser-cut presisi tinggi dan sentuhan jahit tangan artisan berpengalaman.',
      },
      {
        id: 'pillar-3',
        icon: 'palette',
        title: 'Palet Eksklusif Wastra & Royal Tone',
        description:
          'Warna-warna anggun yang dikurasi khusus menyatu sempurna dengan hangatnya undertone kulit wanita Asia Tenggara untuk aura berseri.',
      },
    ] as PillarItem[],
  },

  fabrics: [
    {
      id: 'satin',
      name: 'Mulberry Silk Satin',
      subtitle: 'Kemilau mewah memikat, tekstur licin nan lembut dengan drape anggun.',
      tagline: 'Mulberry Silk Satin • Densitas 19 Momme • Finishing Pearl Luster',
      image: '/images/fabric-satin.webp',
      imageAlt: 'Tekstur Mulberry Silk Satin berkilau lembut keemasan',
    },
    {
      id: 'voile',
      name: 'Fine Voile de Luxe',
      subtitle: 'Ringan, tegak di dahi tanpa perlu sematan rumit, sangat sejuk seharian.',
      tagline: 'Fine Voile de Luxe • 100% Breathable Fiber • Non-Slip Firm Crown',
      image: '/images/fabric-voile.webp',
      imageAlt: 'Tekstur Fine Voile de Luxe hijau emerald berpori halus',
    },
    {
      id: 'chiffon',
      name: 'Chiffon Crepe Royale',
      subtitle: 'Sentuhan butiran pasir bertekstur mikro dengan elastisitas alami untuk layering.',
      tagline: 'Chiffon Crepe Royale • Textured Micro-Grain • Luxurious Fluid Draping',
      image: '/images/fabric-chiffon.webp',
      imageAlt: 'Tekstur kain Chiffon Crepe Royale dengan lipatan natural lembut',
    },
  ] as FabricItem[],

  services: [
    {
      id: 'bespoke-bridal',
      category: 'Pernikahan & Sakral',
      title: 'Bespoke Bridal & Custom Veil',
      description:
        'Desain hijab dan kerudung pengantin custom bertabur kristal swarovski dan bordir monogram khusus yang dirancang eksklusif untuk hari akad dan resepsi sakral Anda.',
      icon: 'favorite',
      badgeColor: 'text-primary',
      actionText: 'Jadwalkan Konsultasi',
    },
    {
      id: 'private-styling',
      category: 'Kurasi Persona',
      title: 'Private Styling Concierge',
      description:
        'Sesi konsultasi privat satu-lawan-satu bersama modest stylist profesional untuk analisis color-harmony, bentuk wajah, dan padu padan busana acara formal.',
      icon: 'style',
      badgeColor: 'text-secondary',
      actionText: 'Reservasi Sesi',
    },
    {
      id: 'corporate-gifting',
      category: 'Hampers & Korporasi',
      title: 'Corporate & VIP Gifting',
      description:
        'Paket bingkisan bingkai eksklusif, seragam korporasi modest berwibawa, dan souvenir hampers hari raya bersertifikasi premium dengan kemasan beludru emas.',
      icon: 'card_giftcard',
      badgeColor: 'text-tertiary',
      actionText: 'Katalog Korporat',
    },
    {
      id: 'atelier-care',
      category: 'Perawatan Tekstil',
      title: 'Atelier Care & Restoration',
      description:
        'Layanan pencucian khusus sutra (dry clean treatment botanis) dan restorasi serat hijab agar kilau alaminya dan kelembutan orisinal tetap terjaga abadi.',
      icon: 'dry_cleaning',
      badgeColor: 'text-outline',
      actionText: 'Panduan Spa Sutra',
    },
  ] as ServiceItem[],

  news: [
    {
      id: 'news-1',
      slug: 'tren-hijab-draped-2025-emerald-silk-paris',
      title: 'Tren Hijab Draped 2025: Mengapa Silk Satin Emerald Jadi Primadona Panggung Paris',
      excerpt:
        'Eksplorasi siluet drape asimetris yang memikat pecinta modest adibusana internasional dengan paduan palet zamrud mulia dan kemilau satin alami.',
      category: 'Tren Modest 2025',
      date: '18 Mei 2025',
      readTime: '5 Menit Baca',
      thumbnail: '/images/news-1.webp',
      thumbnailAlt: 'Model adibusana modest mengenakan hijab drape satin emerald di panggung pagelaran busana',
    },
    {
      id: 'news-2',
      slug: 'panduan-merawat-hijab-sutra-mulberry',
      title: 'Panduan Merawat Hijab Sutra Mulberry Agar Kilau dan Lembutnya Bertahan Bertahun-tahun',
      excerpt:
        'Kiat esensial suhu pencucian, jenis sabun pH netral khusus sutra, serta trik menyetrika tanpa merusak tenunan mikro sutra organik.',
      category: 'Atelier Care',
      date: '10 Mei 2025',
      readTime: '4 Menit Baca',
      thumbnail: '/images/news-2.webp',
      thumbnailAlt: 'Koleksi hijab sutra mulberry terlipat rapi dengan perlengkapan perawatan sutra',
    },
    {
      id: 'news-3',
      slug: 'astalica-gandeng-pengrajin-tenun-sutra-lokal',
      title: 'Astalica Gandeng Pengrajin Tenun Sutra Lokal dalam Program Pemberdayaan Modest Artisans',
      excerpt:
        'Inisiatif sirkular kami untuk memberdayakan lebih dari 120 perajin tenun wanita di Jawa Barat dan Sulawesi Selatan dengan upah berkeadilan.',
      category: 'Pemberdayaan Sosial',
      date: '28 April 2025',
      readTime: '6 Menit Baca',
      thumbnail: '/images/news-3.webp',
      thumbnailAlt: 'Pengrajin tenun sutra tradisional Indonesia sedang menenun kain wastra bermotif emas',
    },
  ] as NewsArticle[],

  contact: {
    address: 'Astalica Grand Atelier, Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190',
    locationName: 'Astalica Grand Atelier Senopati',
    locationFloor: 'Lantai 1–2 Galeri Privat & Fitting Salon',
    phone: '+62 811-9283-7744',
    tel: '(021) 7280-9988',
    whatsapp: '6281192837744',
    email: 'concierge@astalica.id',
    pressEmail: 'press@astalica.id',
    hours: 'Senin – Minggu, 10.00 – 21.00 WIB',
    valetNote: 'Tersedia layanan valet gratis dan ruang privat fitting syar\'i yang nyaman untuk Anda dan keluarga.',
  },

  googleMaps: {
    // Dummy valid embed iframe URL pointing to Jakarta/Senopati area
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257577317789!2d106.8066540758686!3d-6.229737993758368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14ebc249491%3A0xe67db5098ff8e3e4!2sJl.%20Senopati%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
    directionsUrl: 'https://maps.google.com/?q=Jl.+Senopati+No.+88+Jakarta+Selatan',
  },

  nav: [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan & Solusi', href: '#layanan-solusi' },
    { label: 'Warta & Tren', href: '#warta-tren' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
  ] as NavItem[],

  socialLinks: [
    { name: 'Instagram', icon: 'photo_camera', href: 'https://instagram.com' },
    { name: 'TikTok', icon: 'play_circle', href: 'https://tiktok.com' },
    { name: 'YouTube', icon: 'smart_display', href: 'https://youtube.com' },
    { name: 'WhatsApp', icon: 'chat', href: 'https://wa.me/6281192837744' },
  ],
};

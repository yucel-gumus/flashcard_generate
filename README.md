# 🎯 Flashcard Generator (Bilgi Kartı Oluşturucu)

Modern, hızlı ve kullanıcı dostu bir AI destekli bilgi kartı oluşturucu. Google Gemini 2.0 Flash modelini kullanarak, herhangi bir konu hakkında saniyeler içinde eğitici ve öğretici bilgi kartları üretir.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)
![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF.svg)

## ✨ Özellikler

- 🤖 **Gemini AI Entegrasyonu**: Google'ın en yeni ve en hızlı AI modeli (Gemini 2.0 Flash) ile güçlendirilmiştir.
- ⚡ **Anında Oluşturma**: Sadece konu başlığı girerek saniyeler içinde setler oluşturun.
- 🎨 **Modern UI/UX**: Glassmorphism etkileri, akıcı animasyonlar ve responsive tasarım.
- 📱 **Mobil Uyumlu**: Tüm cihazlarda (masaüstü, tablet, telefon) kusursuz deneyim.
- 🔄 **İnteraktif Kartlar**: 3D çevirme efektleri ve sesli geri bildirimler.
- 💾 **Dışa Aktarma**: Kart setlerinizi JSON formatında kaydedin ve paylaşın.
- ⌨️ **Klavye Kısayolları**: Verimlilik için optimize edilmiş kontroller.
- 🇹🇷 **Türkçe Odaklı**: Türkçe içerik üretimi için özel optimize edilmiştir.

## 🚀 Teknolojiler

Bu proje, modern web geliştirme standartlarına uygun olarak geliştirilmiştir:

- **Frontend Framework**: React 19
- **Dil**: TypeScript
- **Build Tool**: Vite
- **Styling**: Modern CSS3 (Variables, Flexbox/Grid, Animations)
- **State Management**: React Hooks (Custom Hooks)
- **Mimari**: Feature-based Modular Architecture

## 📦 Kurulum ve Çalıştırma

Bu proje, bir backend servisi ile birlikte çalışacak şekilde tasarlanmıştır.

### Ön Gereksinimler

- Node.js (v18 veya üzeri)
- NPM veya Yarn
- [Flashcard Backend](https://github.com/yucel-gumus/llm_api) servisi (veya uyumlu bir API)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/yucel-gumus/flashcard-generate.git
cd flashcard-generate
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın

Proje kök dizininde `.env` dosyası oluşturun (veya `.env.local`) ve backend adresinizi tanımlayın:

```env
# Backend API adresiniz (Varsayılan olarak localhost:8000 kabul edilir)
VITE_API_URL=http://localhost:8000/api/generate
```

> **Not:** Backend servisi, Google Gemini API anahtarını yönetir. Frontend tarafında API anahtarı **saklanmaz**.

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

## 🏗️ Proje Yapısı

Proje, okunabilirliği ve bakımı kolaylaştırmak için modüler bir yapıda düzenlenmiştir:

```
flashcard-generate/
├── src/
│   ├── components/      # UI bileşenleri (Card, Input, Button vb.)
│   ├── services/        # API entegrasyon servisleri
│   ├── hooks/           # Custom React hook'ları
│   ├── types/           # TypeScript tip tanımları
│   ├── utils/           # Yardımcı fonksiyonlar
│   ├── styles/          # Global stiller ve temalar
│   ├── constants/       # Sabitler ve konfigürasyonlar
│   ├── App.tsx          # Ana uygulama bileşeni
│   └── main.tsx         # Giriş noktası
├── public/              # Statik dosyalar
├── .env                 # Ortam değişkenleri
└── package.json         # Proje bağımlılıkları
```

## 🎮 Kullanım Kılavuzu

1. **Konu Seçimi**: Arama çubuğuna öğrenmek istediğiniz konuyu yazın (örn: "Python Döngüler", "İstanbul Tarihi").
2. **Oluşturma**: `Enter` tuşuna basın veya "Oluştur" butonuna tıklayın.
3. **Öğrenme**:
   - Kartın üzerine tıklayarak (veya `Boşluk` tuşu) ön/arka yüzü çevirin.
   - Ok tuşları veya butonlar ile kartlar arasında geçiş yapın.
4. **Yönetim**:
   - "Karıştır" ile sırayı değiştirin.
   - "İndir" ile seti cihazınıza kaydedin.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Bu depoyu Fork'layın.
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/yeni-ozellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Yeni özellik eklendi'`).
4. Dalınızı Push edin (`git push origin feature/yeni-ozellik`).
5. Bir Pull Request oluşturun.

## 📄 Lisans

Bu proje [Apache 2.0](LICENSE) lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- **Google AI**: Gemini API desteği için.
- **Open Source**: React, Vite ve TypeScript topluluklarına.
- **Yücel Gümüş**: Proje geliştiricisi.

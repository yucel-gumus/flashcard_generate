# 🎯 Bilgi Kartı Oluşturucu

Modern ve kullanıcı dostu bir AI destekli bilgi kartı oluşturucu. Google Gemini API kullanarak herhangi bir konu hakkında otomatik olarak etkileşimli bilgi kartları oluşturur.

## ✨ Özellikler

- 🤖 **Gemini AI Entegrasyonu** - Google'ın en gelişmiş AI modeli
- 📚 **Otomatik Kart Oluşturma** - Herhangi bir konu için anında kartlar
- 🔄 **İnteraktif Animasyonlar** - Smooth kart çevirme efektleri
- 🎯 **Kullanıcı Dostu Arayüz** - Sezgisel ve modern tasarım
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- 🔀 **Kart Karıştırma** - Rastgele sıralama özelliği
- 💾 **JSON Export** - Kartları kaydetme ve paylaşma
- ⌨️ **Klavye Kısayolları** - Ctrl+Enter ile hızlı oluşturma
- 🎵 **Ses Efektleri** - Kart çevirme sesleri
- 📊 **İlerleme Takibi** - Hangi kartlarda olduğunuzu görün
- 🇹🇷 **Tam Türkçe Destek** - Yerel dil desteği

## 🚀 Teknolojiler

- **Frontend**: TypeScript, HTML5, CSS3
- **Build Tool**: Vite
- **AI API**: Google Gemini 2.0 Flash
- **Styling**: Modern CSS with animations
- **Architecture**: Modular TypeScript

## 📦 Kurulum

### Gereksinimler

- Node.js (v18+)
- NPM (v8+)
- Google Gemini API Anahtarı

### Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone <repo-url>
cd flashcard-generator

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Geliştirme sunucusunu başlatın
npm run dev
```

### API Anahtarı Alma

1. [Google AI Studio](https://makersuite.google.com/app/apikey)'ya gidin
2. Yeni API anahtarı oluşturun
3. `.env.local` dosyasına ekleyin

## 🎮 Kullanım

### Temel Kullanım
1. Metin alanına bir konu girin (örn: "Yapay Zeka")
2. "Bilgi Kartı Oluştur" butonuna tıklayın
3. Kartlara tıklayarak cevapları görün

### Klavye Kısayolları
- `Ctrl + Enter`: Kart oluştur
- `Tıklama`: Kartı çevir

### Gelişmiş Özellikler
- **Karıştır**: Kartları rastgele sıralar
- **Kaydet**: JSON formatında indir
- **İlerleme**: Hangi kartta olduğunuzu takip edin

## 🏗️ Proje Yapısı

```
flashcard-generator/
├── index.html          # Ana HTML dosyası
├── index.tsx           # TypeScript ana kod
├── index.css           # Stil tanımlamaları
├── package.json        # Proje yapılandırması
├── tsconfig.json       # TypeScript ayarları
├── vite.config.ts      # Vite yapılandırması
└── .env.local          # Ortam değişkenleri
```

## 🔧 Geliştirme

### Mevcut Komutlar

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
npm run type-check   # TypeScript kontrolü
npm run clean        # Build dosyalarını temizle
```

### Kod Kalitesi

- **TypeScript**: Tip güvenliği
- **Modüler Yapı**: Temiz ve sürdürülebilir kod
- **Error Handling**: Kapsamlı hata yönetimi
- **Performance**: Optimize edilmiş performans

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI ile
npm i -g vercel
vercel

# Veya GitHub entegrasyonu ile
# 1. GitHub'a push edin
# 2. Vercel'de import edin
# 3. GEMINI_API_KEY environment variable ekleyin
```

### Netlify

```bash
# Build komutu: npm run build
# Publish directory: dist
# Environment variables: GEMINI_API_KEY
```

### Manuel Deployment

```bash
npm run build
# dist/ klasörünü web sunucunuza yükleyin
```

## 🔒 Güvenlik

- ✅ API anahtarları environment variables'da
- ✅ `.env.local` gitignore'da
- ✅ Client-side validation
- ✅ Error boundary implementation

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Commit Kuralları

- `feat:` - Yeni özellik
- `fix:` - Bug düzeltme
- `docs:` - Dokümantasyon
- `style:` - Kod formatı
- `refactor:` - Kod yeniden düzenleme
- `test:` - Test ekleme
- `chore:` - Bakım işleri

## 📄 Lisans

Bu proje Apache 2.0 lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- Google Gemini AI ekibine
- Vite geliştirici topluluğuna
- TypeScript ekibine

## 📞 İletişim

- GitHub Issues: Bug raporları ve özellik istekleri
- Email: [your-email@example.com]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

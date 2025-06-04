# Bilgi Kartı Oluşturucu

Bu proje, Gemini AI API'sini kullanarak herhangi bir konu hakkında otomatik olarak bilgi kartları oluşturan bir web uygulamasıdır.

## Özellikler

- 🤖 Gemini AI API entegrasyonu
- 📝 Herhangi bir konu için otomatik bilgi kartı oluşturma
- 🔄 İnteraktif kart çevirme animasyonu
- 💡 Kolay kullanıcı arayüzü
- 🌙 Modern ve responsive tasarım
- 🇹🇷 Tam Türkçe dil desteği

## Teknolojiler

- TypeScript
- Vite
- Google Gemini AI API
- CSS3 Animations
- HTML5

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- NPM (Node Package Manager)
- Gemini API Anahtarı

### Lokal Geliştirme Ortamı

1. Projeyi klonlayın:
   ```bash
   git clone [repo-url]
   cd flashcard-maker
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env.local` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

5. Tarayıcınızda açın:
   ```
   http://localhost:5173
   ```

## Kullanım

1. Uygulama arayüzünde metin alanına bir konu girin (örn: "Yapay Zeka") veya manuel olarak terim-tanım çiftleri ekleyin
2. "Bilgi Kartı Oluştur" butonuna tıklayın
3. Oluşturulan kartları görmek için bekleyin
4. Kartların üzerine tıklayarak ön ve arka yüzlerini görebilirsiniz

## Proje Yapısı

- `index.html`: Ana HTML dosyası ve uygulama giriş noktası
- `index.tsx`: TypeScript ana uygulama kodu
- `index.css`: Stil tanımlamaları ve animasyonlar
- `vite.config.ts`: Vite yapılandırması
- `tsconfig.json`: TypeScript yapılandırması
- `.env.local`: Ortam değişkenleri (API anahtarı)

## Build ve Dağıtım

### Yerel Build

Projeyi production için derlemek için:

```bash
npm run build
```

Bu komut `dist` klasöründe optimize edilmiş dosyalar oluşturacaktır.

### Vercel Deployment

1. GitHub'a projenizi push edin
2. [Vercel](https://vercel.com)'de hesap oluşturun
3. "New Project" butonuna tıklayın
4. GitHub reponuzu seçin
5. Framework Preset olarak "Vite" seçin
6. Environment Variables bölümünde:
   - NAME: `GEMINI_API_KEY`
   - VALUE: Gemini API anahtarınız
7. "Deploy" butonuna tıklayın

Vercel otomatik olarak:
- Her push'ta yeni versiyonu deploy edecek
- HTTPS ve CDN desteği sağlayacak
- Automatic Branch Deployments yapacak
- Deploy Preview özelliği sunacak

### Production URL'i

Deploy tamamlandıktan sonra Vercel size bir production URL'i verecek:
```
https://your-project-name.vercel.app
```

## Güvenlik

- API anahtarınızı güvende tutun ve `.env.local` dosyasını asla paylaşmayın
- `.gitignore` dosyasında `.env.local` dosyasının hariç tutulduğundan emin olun

## Lisans

Bu proje Apache 2.0 lisansı altında lisanslanmıştır.

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

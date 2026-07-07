# 🎯 Bilgi Kartı Oluşturucu (AI-Powered Flashcard Generator)

Bilgi Kartı Oluşturucu; kullanıcıların istedikleri herhangi bir eğitim konusu veya ders başlığı hakkında saniyeler içinde zengin ve öğretici bilgi kartları (flashcards) üretmesini sağlayan, **React 19 & Vite 6 & TypeScript** tabanlı modern bir web uygulamasıdır. 

Uygulamanın yapay zeka entegrasyonu, Google Gemini'ın **Structured Output (Yapılandırılmış Çıktı)** yeteneğini kullanarak veri tutarlılığını garanti altına alır.

---

## 🌟 Öne Çıkan Özellikler

* 🤖 **Gemini AI Structured JSON Çıktısı:**
  * Yapay zeka, kullanıcının girdiği konuya göre `{ front: string, back: string }` şemasında kesin bir JSON dizisi üretir. Bu sayede veri kesintileri veya parsing hataları önlenir.
* 🔄 **3D Kart Çevirme Animasyonları:** Kartlar, zengin kullanıcı deneyimi için CSS 3D transform özellikleri (`perspective`, `rotateY`, `backface-visibility`) kullanılarak interaktif bir 3D çevirme animasyonuna sahiptir.
* 💾 **JSON Dışa Aktarma & Paylaşma:** Oluşturulan bilgi kartı setlerini bilgisayarınıza tek tıkla JSON formatında indirebilir, daha sonra tekrar yükleyebilirsiniz.
* 🔀 **Akıllı Karıştırma (Shuffle):** Kartların sırasını rastgele değiştirerek öğrenme verimliliğini artıran karıştırma özelliği.
* ⌨️ **Klavye Kısayolları Kontrolü:** 
  * `Boşluk (Space)` tuşu ile kartın ön/arka yüzünü çevirme.
  * `Sağ/Sol Ok` tuşları ile sonraki/önceki karta geçiş.
  * `Enter` tuşu ile yeni kart seti oluşturma.
* 📱 **Tam Mobil Uyum:** Responsive tasarım ile telefon, tablet ve bilgisayarlarda tam ekran kart öğrenme deneyimi.

---

## 🏗️ Veri Akışı ve Proxy Altyapısı

İstemci tarafında API anahtarlarını güvenli tutmak için tüm yapay zeka istekleri Vercel Serverless proxy katmanı üzerinden geçirilir:

```
[ İstemci (React + CSS 3D) ] ──(POST /api/generate)──► [ Vercel Serverless (api/generate.ts) ]
                                                                   │
                                                         (X-API-Key Yetkilendirme)
                                                                   ▼
[ Gemini 3.5 Flash ] ◄──(Structured JSON [Front/Back])─── [ Python Gateway (api.yucelgumus.dev) ]
```

---

## 📂 Proje Klasör Yapısı

```
flashcard_generate/
├── src/
│   ├── components/       # CardGrid, Flashcard, TopicInput, Header, Layout bileşenleri
│   ├── services/         # API (Gateway) bağlantı servisi
│   ├── hooks/            # Custom React hook'ları (klavye dinleyicileri, set yönetimi)
│   ├── styles/           # 3D kart çevirme efektleri ve glassmorphism CSS stilleri
│   ├── types/            # TypeScript kart ve API tip tanımları
│   ├── App.tsx           # Ana React uygulama bileşeni ve durum yönetimi
│   └── main.tsx
├── api/
│   └── generate.ts       # Vercel Serverless Gateway Proxy
├── tsconfig.json
├── vite.config.ts        # Dev proxy yapılandırması
└── package.json
```

---

## 🚀 Kurulum ve Yerel Çalıştırma

### 1. Bağımlılıkları Yükleyin
```bash
git clone https://github.com/yucel-gumus/flashcard_generate.git
cd flashcard_generate
npm install
```

### 2. Ortam Değişkenleri (`.env`)
Proje kök dizininde `.env` dosyası oluşturun ve geçit adreslerini tanımlayın:

```env
# Sunucu Tarafı (Vercel Serverless / Local API için)
AI_API_URL=https://api.yucelgumus.dev
GATEWAY_CLIENT_API_KEY=your_client_api_key

# İstemci Tarafı (Boş bırakılırsa same-origin /api/generate kullanılır)
VITE_API_URL=
```

### 3. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```
Uygulama `http://localhost:5173` adresinde başlayacaktır.

---

## 🔗 Canlı Bağlantılar
* **Canlı Demo:** [http://bilgi-kart-olu-turucu.vercel.app/](http://bilgi-kart-olu-turucu.vercel.app/)
* **API Gateway Kaynak Kodu:** [yucel-gumus/llm_api](https://github.com/yucel-gumus/llm_api)

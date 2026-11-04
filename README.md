# Pixtudio

Tarayıcıda çalışan, kurulum gerektirmeyen yapay zekâ destekli fotoğraf ve video düzenleyici.

**Canlı sürüm:** https://pixtudio.vercel.app

## Özellikler

### Fotoğraf (pro editör)
- **AI asistan:** tek dokunuşla otomatik iyileştirme, komutla düzenleme ("daha sinematik yap", "arka planı kaldır", "gülümset"), Claude içinde açıldığında fotoğrafı görerek düzenleme.
- **AI Stüdyo (üretken):** yazıdan görsel oluşturma, fotoğrafı yazıyla düzenleme (kışa çevir, anime tarzı, kıyafet değiştir vb.), AI ile arka plan oluşturma, AI ile nesne silme. Hugging Face anahtarı gerekir.
- **Arka plan:** kişiyi otomatik algılayıp arka planı kaldırma (şeffaf PNG), bulanıklaştırma, renk vurgusu, düz renk, degrade, kendi görselinle değiştirme.
- **Yüz rötuşu:** 468 noktalı yüz ağıyla otomatik ve hassas efektler — pürüzsüz cilt, ruj, gülümseme, yaş, saç ve kıyafet rengi, sakal, gözlük, makyaj, yüz şekli.
- **Rötuş:** leke silme fırçası, sihirli seçimle nesne silme ve dekupe.
- **Ayarlar:** ışık, renk, HSL, renk derecelendirme, netlik, pus giderme, keskinlik, vinyet, gren; 13 hazır görünüm.
- Kırpma ve açı düzeltme, 2× büyütme, metin, histogram, yakınlaştırma, önce/sonra, geçmiş, JPG/PNG/WEBP dışa aktarma.

### Yüz Değiştir ve AI Video
- Fotoğraflar arasında yüz taşıma, komutla animasyonlu video sahneleri, MP4/WebM dışa aktarma.

## Yapay zekâ motorları

| Özellik | Nerede çalışır |
|---|---|
| Yüz noktaları, kişi/arka plan ayırma | Cihazda (`ai/face_mesh`, `ai/selfie`) |
| Saç, kıyafet, sihirli seçim | Cihazda; model ilk kullanımda Google'dan indirilir (`ai/tasks`) |
| Üretken AI | Hugging Face Inference Providers (FLUX.1 modelleri), kullanıcının kendi anahtarıyla |

Yapay zekâ modelleri bir web sunucusu gerektirir; `index.html` doğrudan dosyadan açılırsa temel düzenleme çalışır ama AI modelleri yüklenmez.

## Hugging Face anahtarı
1. https://huggingface.co/settings/tokens → **Create new token** → **Fine-grained**
2. "Make calls to Inference Providers" iznini işaretle.
3. Pixtudio'da **Oluştur** paneline yapıştır. Anahtar yalnızca tarayıcında saklanır.

## Sorumlu kullanım
Yüz değiştirme ve üretken özellikleri yalnızca kendi görüntülerinle ya da izin aldığın kişilerin görüntüleriyle kullan. Gerçek kişileri yanıltıcı biçimde gösteren içerikler üretme.

## Lisanslar
MediaPipe modelleri ve kütüphaneleri Apache-2.0, Hugging Face JS istemcisi MIT lisanslıdır.

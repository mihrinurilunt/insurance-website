# Web Sitesi Oluşturucu - Claude Code

Bu proje, `/site-yap` komutu ile profesyonel, benzersiz web siteleri oluşturur.

---

## Her Zaman İlk Yap

- **"frontend-design" skill'ini çağır** — frontend kodu yazmadan önce, her seferinde, istisnasız.
- CLAUDE.md'yi oku ve tüm kurallara uy.

---

## Tasarım Düşüncesi

Kod yazmadan ÖNCE, bağlamı anla ve CESUR bir estetik yön seç:

- **Amaç:** Bu arayüz hangi sorunu çözüyor? Kim kullanacak?
- **Ton:** Bir uç seç ve tam uygula:
  - brutalist minimal  
  - maksimalist kaos  
  - retro-fütüristik  
  - organik / doğal  
  - lüks / rafine  
  - oyuncu  
  - editorial / dergi  
  - brutalist / ham  
  - art deco / geometrik  
  - soft / pastel  
  - endüstriyel  

- **Farklılaşma:**  
  Bu siteyi UNUTULMAZ yapan ne?  
  Birinin hatırlayacağı tek şey ne?

## Tasarım Düşüncesi

- **Amaç:** Bu arayüz hangi sorunu çözüyor? Kim kullanacak?
- **Ton:** Bir uç seç ve tam uygula:
  - brutalist minimal  
  - maksimalist kaos  
  - retro-fütüristik  
  - organik / doğal  
  - lüks / rafine  
  - oyuncu  
  - editorial / dergi  
  - brutalist / ham  
  - art deco / geometrik  
  - soft / pastel  
  - endüstriyel  

- **Farklılaşma:**  
  Bu siteyi UNUTULMAZ yapan ne?  
  Birinin hatırlayacağı tek şey ne?

Net bir konsept yönü seç ve hassas bir şekilde uygula.  
Cesur maksimalizm de, rafine minimalizm de işe yarar — önemli olan niyetlilik, yoğunluk değil.

---

## Referans Görseller

- Referans görsel verilirse:
  - layout, spacing, tipografi ve rengi TAM eşleştir
  - placeholder içerik koy
  - tasarımı iyileştirme veya ekleme yapma

- Referans görsel yoksa:
  - sıfırdan yüksek kalitede tasarla (aşağıdaki kurallara göre)

- Çıktını screenshot al, referansla karşılaştır, uyumsuzlukları düzelt, tekrar screenshot al  
- En az 2 karşılaştırma turu yap  
- Görünür fark kalmayana kadar devam et  

---

## Screenshot Workflow

- Puppeteer kullanılabilir durumda  
- Screenshot aldıktan sonra PNG'yi Read tool ile oku — Claude görseli görebilir ve analiz edebilir  

### Karşılaştırırken

Spesifik ol:
- "başlık 32px ama referansta ~24px görünüyor"
- "kart gap'i 16px ama 24px olmalı"

Kontrol et:
- spacing / padding  
- font size / weight / line-height  
- renkler (exact hex)  
- alignment  
- border-radius  
- shadows  
- görsel boyutları  

---

## Yasak Liste

### Fontlar
- Inter  
- Roboto  
- Arial  
- system-ui  
- system font stack  

→ Tembel, bağlamsız seçimler

---

### Renkler
- Mor gradient (#7c3aed → #3b82f6) beyaz üzerine  
- Default Tailwind palette (indigo-500, blue-600 vb.) birincil renk olarak  

→ Klişe renk şemaları

---

### Layoutlar
- Cookie-cutter 3 kartlık grid  
- Ortalanmış her şey  
- Simetrik her şey  
- Tahmin edilebilir component patternleri  

---

### Patternler
- Aynı border-radius her yerde  
- Aynı shadow kullanımı  

---

## Anti-Generic Guardrails

### Gradientler

```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
```

### Animasyonlar
- Sadece transform ve opacity kullan
transition-all → YASAK
- Easing:
cubic-bezier(0.34, 1.56, 0.64, 1)

- IntersectionObserver ile:
scroll-triggered reveal
staggered animation-delay
- Sayfa yüklenişi:
orchestrated entrance (bölümler sırayla gelsin)

### Interactive States

Her tıklanabilir elementte:
Hover
Focus-visible
Active
Olmak zorunda.

- Hover:
sadece opacity değil
transform, color shift, scale, clip-path
- Focus-visible:
belirgin outline (accessibility)
- Active:
hafif scale-down veya renk değişimi

### Spacing

8px grid sistemi kullan:

--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 48px;
--space-2xl: 80px;
--space-3xl: 120px;


→ Rastgele spacing YASAK

### Derinlik (Depth)

Katman sistemi:

Base: ana arka plan
Elevated: kartlar / paneller
Floating: modal / tooltip / dropdown

→ Hepsi aynı düzlemde olamaz

#### Varsayılan Sayfa Bölümleri
1. Navigation (sticky / fixed, mobil hamburger dahil)
2. Hero (full viewport, güçlü ilk izlenim)
3. Sosyal Kanıt (logo bar / istatistik / testimonial strip)
4. Hizmetler / Özellikler
5. Hakkında / Nasıl Çalışır (3 adım veya hikaye)
6. Galeri / Projeler
7. Referanslar / Testimonials
8. SSS (accordion + animasyon)
9. CTA (güçlü kapanış)
10. Footer (iletişim + sosyal ikonlar)

### Kalite Kontrolü

Siteyi oluşturduktan sonra kendine sor:

- “Bunu insan tasarımcı mı yaptı?”
- Font sıradan mı?
- Renk paleti klişe mi?
- Layout tahmin edilebilir mi?
- Mobil deneyim iyi mi?
- Arka plan çok düz mü?
- Hover state’ler sıkıcı mı?
- Sayfa giriş animasyonu var mı?
- transition-all kullanılmış mı?
- Shadow’lar yeterince katmanlı mı?
- Spacing tutarlı mı?
- Başka AI çıktısına benziyor mu?

→ Herhangi biri “evet” ise → YENİDEN YAP

### Hard Rules
- Referans varsa → EKLEME YAPMA, sadece eşleştir
- Referans yoksa → CESUR OL, generic yapma
- Screenshot karşılaştırmasını atlamak → YASAK
transition-all kullanmak → YASAK
- Default Tailwind renklerini primary yapmak → YASAK
- Aynı font kombinasyonunu tekrar etmek → YASAK
// =============================================
// ÇAĞDAŞ LİDER SİGORTA — APP.JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- Mobile hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ---- Sigorta türü seçimi ----
  const turuBtns = document.querySelectorAll('.turu-btn');
  const sigortaTuruInput = document.getElementById('sigortaTuru');
  const allDynamicFields = document.querySelectorAll('.dynamic-fields');
  const hayatTuruSelect = document.getElementById('hayat-turu');
  const besKatkiWrapper = document.getElementById('bes-katki-wrapper');

  function toggleBesKatkiField() {
    if (!hayatTuruSelect || !besKatkiWrapper) return;
    const shouldShow = sigortaTuruInput.value === 'hayat' && hayatTuruSelect.value === 'bes';
    besKatkiWrapper.classList.toggle('hidden', !shouldShow);
  }

  turuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Aktif butonu güncelle
      turuBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.dataset.type;
      sigortaTuruInput.value = type;

      // Dinamik alanları göster/gizle
      allDynamicFields.forEach(field => {
        field.classList.add('hidden');
      });

      const target = document.getElementById(`fields-${type}`);
      if (target) target.classList.remove('hidden');
      toggleBesKatkiField();
    });
  });

  if (hayatTuruSelect) {
    hayatTuruSelect.addEventListener('change', toggleBesKatkiField);
    toggleBesKatkiField();
  }

  // ---- Teklif formu gönderimi ----
  const teklifForm = document.getElementById('teklifForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  teklifForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Temel doğrulama
    const ad = document.getElementById('ad').value.trim();
    const telefon = document.getElementById('telefon').value.trim();
    const kvkk = document.getElementById('kvkk').checked;

    if (!ad) {
      showFieldError('ad', 'Ad soyad zorunludur.');
      return;
    }

    if (!telefon || !/^[0-9\s\-\+\(\)]{10,15}$/.test(telefon.replace(/\s/g, ''))) {
      showFieldError('telefon', 'Geçerli bir telefon numarası girin.');
      return;
    }

    if (!kvkk) {
      alert('KVKK onayı zorunludur.');
      return;
    }

    // Gönder animasyonu
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Gönderiliyor...';

    // Simülasyon (gerçek backend bağlantısı için buraya fetch/axios ekleyin)
    setTimeout(() => {
      // Form verilerini topla
      const formData = new FormData(teklifForm);
      const data = Object.fromEntries(formData.entries());

      // E-posta body oluştur (mailto fallback)
      const sigortaTuru = sigortaTuruInput.value;
      const turLabels = {
        kasko: 'Kasko', trafik: 'Trafik', konut: 'Konut',
        dask: 'DASK', saglik: 'Sağlık', seyahat: 'Seyahat',
        isyeri: 'İşyeri', hayat: 'Hayat/BES'
      };

      const emailSubject = encodeURIComponent(`Sigorta Teklif Talebi – ${turLabels[sigortaTuru] || sigortaTuru} – ${data.ad}`);
      let emailBody = `Sigorta Türü: ${turLabels[sigortaTuru] || sigortaTuru}\n`;
      emailBody += `Ad Soyad: ${data.ad}\n`;
      emailBody += `Telefon: ${data.telefon}\n`;
      if (data.email) emailBody += `E-posta: ${data.email}\n`;
      if (data.tc_kimlik_no) emailBody += `TC Kimlik No: ${data.tc_kimlik_no}\n`;
      if (data.vergi_no) emailBody += `Vergi No: ${data.vergi_no}\n`;
      if (data.sehir) emailBody += `Şehir: ${data.sehir}\n`;
      if (data.plaka) emailBody += `Plaka: ${data.plaka}\n`;
      if (data.arac_marka) emailBody += `Araç: ${data.arac_marka}\n`;
      if (data.arac_yil) emailBody += `Araç Yılı: ${data.arac_yil}\n`;
      if (data.notlar) emailBody += `\nNotlar: ${data.notlar}\n`;

      const mailtoLink = `mailto:cagdaslidersigorta34@gmail.com?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;

      // Başarı mesajını göster
      teklifForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');

      // E-posta istemcisini aç
      window.location.href = mailtoLink;

    }, 1200);
  });

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.focus();
    field.style.borderColor = '#e53e3e';
    field.style.boxShadow = '0 0 0 3px rgba(229,62,62,0.1)';

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();

    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#e53e3e;font-size:12px;margin-top:4px;display:block;';
    err.textContent = message;
    field.parentNode.appendChild(err);

    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
      const e = field.parentNode.querySelector('.field-error');
      if (e) e.remove();
    }, { once: true });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Intersection Observer (animasyon) ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hizmet-card, .acente-card, .neden-item, .side-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Diğer açık olanları kapat
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Bu öğeyi aç/kapat
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ---- Telefon formatı ----
  const telefonInput = document.getElementById('telefon');
  telefonInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    // Format: 0XXX XXX XX XX
    if (val.length >= 5) {
      val = val.slice(0, 4) + ' ' + val.slice(4, 7) + (val.length > 7 ? ' ' + val.slice(7, 9) : '') + (val.length > 9 ? ' ' + val.slice(9) : '');
    }
    e.target.value = val;
  });

});

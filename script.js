document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to');
    const instansiParam = urlParams.get('instansi');
    const kategoriParam = urlParams.get('kategori');
    const guestNameEl = document.getElementById('guestName');
    const guestInstansiEl = document.getElementById('guestInstansi');
    const guestCategoryEl = document.getElementById('guestCategory');
    if (toParam) guestNameEl.textContent = decodeURIComponent(toParam.replace(/\+/g, ' '));
    if (instansiParam) guestInstansiEl.textContent = decodeURIComponent(instansiParam.replace(/\+/g, ' '));
    if (kategoriParam) {
        const k = decodeURIComponent(kategoriParam.replace(/\+/g, ' '));
        const label = { Universitas: 'Perwakilan Universitas', Perusahaan: 'Perusahaan Mitra', Alumni: 'Alumni' }[k] || k;
        guestCategoryEl.textContent = label;
    }
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const kehadiran = document.querySelector('input[name="kehadiran"]:checked');
            if (!kehadiran) { alert('Pilih status kehadiran!'); return; }
            const data = { nama: document.getElementById('nama').value, instansi: document.getElementById('instansi').value, kategori: document.getElementById('kategori').value, jumlah: document.getElementById('jumlah').value, kehadiran: kehadiran.value, catatan: document.getElementById('catatan').value, tanggal: new Date().toLocaleString('id-ID') };
            const all = JSON.parse(localStorage.getItem('rsvp_data') || '[]');
            all.push(data);
            localStorage.setItem('rsvp_data', JSON.stringify(all));
            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
// ========== الملف الرئيسي ==========

// العناصر المشتركة
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// قائمة الهاتف
if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    console.log('📄 الصفحة:', page);
    
    // تشغيل الصفحة المناسبة
    if (page === 'movies.html') {
        if (typeof renderMoviesPage === 'function') renderMoviesPage();
    } else if (page === 'tvshows.html') {
        if (typeof renderTVShowsPage === 'function') renderTVShowsPage();
    } else if (page === 'top-rated.html') {
        if (typeof renderTopRatedPage === 'function') renderTopRatedPage();
    } else if (page === 'index.html' || page === '') {
        if (typeof renderMovies === 'function') renderMovies();
    }
    
    // تشغيل البحث
    setTimeout(() => {
        if (typeof setupSearch === 'function') setupSearch();
    }, 100);
    
    // زر العودة للأعلى
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 300);
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // تحديث الإحصائيات
    if (typeof updateStats === 'function') updateStats();
});
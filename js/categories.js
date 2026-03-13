// ========== دوال التصنيفات (مُحسّنة للسرعة) ==========

// جلب جميع التصنيفات المتاحة
function getAllCategories() {
    return ['movie', 'tvshow'];
}

// جلب العناصر حسب التصنيف
function getByCategory(category) {
    if (category === 'movie') {
        return MovieDB.getMovies();
    } else if (category === 'tvshow') {
        return MovieDB.getTVShows();
    } else {
        return MovieDB.getAll();
    }
}

// جلب إحصائيات التصنيفات
function getCategoryStats() {
    const movies = MovieDB.getMovies().length;
    const tvshows = MovieDB.getTVShows().length;
    const total = movies + tvshows;
    
    return {
        movies: movies,
        tvshows: tvshows,
        total: total,
        moviePercentage: total > 0 ? ((movies / total) * 100).toFixed(1) : 0,
        tvPercentage: total > 0 ? ((tvshows / total) * 100).toFixed(1) : 0
    };
}

// عرض شريط التصنيفات (خفيف وسريع)
function renderCategoryBar() {
    const container = document.getElementById('categoryBar');
    if (!container) return;
    
    const stats = getCategoryStats();
    
    container.innerHTML = `
        <div class="category-bar">
            <button class="category-btn active" data-category="all">الكل <span class="category-count">${stats.total}</span></button>
            <button class="category-btn" data-category="movie">أفلام <span class="category-count">${stats.movies}</span></button>
            <button class="category-btn" data-category="tvshow">مسلسلات <span class="category-count">${stats.tvshows}</span></button>
        </div>
    `;
    
    // إضافة أحداث النقر
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

// فلترة حسب التصنيف
function filterByCategory(category) {
    const container = document.getElementById('moviesContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner" style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #ffb347;"></i><p style="color: #8888aa;">جاري التحميل...</p></div>';
    
    setTimeout(() => {
        let filtered;
        if (category === 'all') {
            filtered = MovieDB.getAll();
        } else if (category === 'movie') {
            filtered = MovieDB.getMovies();
        } else {
            filtered = MovieDB.getTVShows();
        }
        
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #8888aa;">لا توجد عناصر</div>';
            return;
        }
        
        filtered.forEach((item, index) => {
            if (typeof createMovieCard === 'function') {
                container.appendChild(createMovieCard(item, index));
            }
        });
    }, 10);
}
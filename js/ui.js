// ========== دوال الواجهة ==========

// دالة منع XSS
function escapeHTML(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// إنشاء بطاقة الفيلم
function createMovieCard(movie, index) {
    const card = document.createElement('a');
    card.href = MovieDB.getMovieUrl(movie);
    card.className = 'movie-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const typeIcon = movie.type === 'movie' ? 'fa-film' : 'fa-tv';
    const typeText = movie.type === 'movie' ? 'فيلم' : 'مسلسل';
    
    const posterHtml = movie.poster ? 
        `<img 
            src="${movie.poster}" 
            alt="${typeText}: ${movie.title} - ${movie.year}"
            class="movie-poster"
            loading="lazy"
        >` : 
        `<div class="movie-poster-placeholder">
            <i class="fas ${typeIcon}"></i>
            <span>${movie.title}</span>
        </div>`;
    
    card.innerHTML = `
        <div class="movie-card-header">
            <div class="movie-title">
                <i class="fas ${typeIcon}"></i>
                <span>${escapeHTML(movie.title)}</span>
                <span class="movie-category">${typeText}</span>
            </div>
            <div class="movie-year">${escapeHTML(movie.year)}</div>
        </div>
        ${posterHtml}
        <div class="movie-summary">${escapeHTML(movie.summary.substring(0, 120))}...</div>
        <div class="movie-meta">
            <span class="movie-rating">
                <i class="fas fa-star"></i> ${escapeHTML(movie.rating)}
            </span>
            <span class="movie-director">
                <i class="fas fa-user"></i> ${escapeHTML(movie.director)}
            </span>
        </div>
    `;
    
    return card;
}

// عرض الصفحة الرئيسية
function renderMovies(filterText = '') {
    const container = document.getElementById('moviesContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>جاري التحميل...</p></div>';
    
    setTimeout(() => {
        const filtered = filterText ? MovieDB.search(filterText) : MovieDB.getAll();
        
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
            return;
        }
        
        filtered.forEach((movie, index) => {
            container.appendChild(createMovieCard(movie, index));
        });
        
        updateStats();
    }, 10);
}

// تحديث الإحصائيات
function updateStats() {
    const stats = MovieDB.getStats();
    
    const movieCountSpan = document.getElementById('movieCount');
    const tvCountSpan = document.getElementById('tvCount');
    const avgRatingSpan = document.getElementById('avgRating');
    
    if (movieCountSpan) movieCountSpan.textContent = stats.totalMovies;
    if (tvCountSpan) tvCountSpan.textContent = stats.totalTVShows;
    if (avgRatingSpan) avgRatingSpan.textContent = stats.averageRating;
}

// عرض صفحة الأفلام فقط
function renderMoviesPage() {
    const container = document.getElementById('moviesContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>جاري التحميل...</p></div>';
    
    setTimeout(() => {
        const moviesList = MovieDB.getMovies();
        
        container.innerHTML = '';
        moviesList.forEach((movie, index) => {
            container.appendChild(createMovieCard(movie, index));
        });
    }, 10);
}

// عرض صفحة المسلسلات فقط
function renderTVShowsPage() {
    const container = document.getElementById('moviesContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>جاري التحميل...</p></div>';
    
    setTimeout(() => {
        const tvList = MovieDB.getTVShows();
        
        container.innerHTML = '';
        tvList.forEach((show, index) => {
            container.appendChild(createMovieCard(show, index));
        });
    }, 10);
}

// عرض صفحة الأكثر تقييماً
function renderTopRatedPage() {
    const container = document.getElementById('topRatedContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>جاري التحميل...</p></div>';
    
    setTimeout(() => {
        const topRated = MovieDB.getTopRated();
        
        container.innerHTML = '';
        topRated.forEach((item, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'top-rated-item';
            rankItem.style.animationDelay = `${index * 0.05}s`;
            
            rankItem.addEventListener('click', () => {
                window.location.href = MovieDB.getMovieUrl(item);
            });
            
            const typeIcon = item.type === 'movie' ? 'fa-film' : 'fa-tv';
            
            rankItem.innerHTML = `
                <div class="top-rated-rank">#${index + 1}</div>
                <div class="top-rated-info">
                    <h3>${escapeHTML(item.title)} <i class="fas ${typeIcon}" style="color: #ffb347; font-size: 0.9rem;"></i></h3>
                    <p>${escapeHTML(item.director)} • ${escapeHTML(item.year)}</p>
                </div>
                <div class="top-rated-rating">
                    <i class="fas fa-star"></i> ${escapeHTML(item.rating)}
                </div>
            `;
            
            container.appendChild(rankItem);
        });
    }, 10);
}

// تحميل تفاصيل الفيلم (معدل لـ GitHub Pages)
function loadMovieDetails(movieId) {
    console.log('📥 جاري تحميل تفاصيل الفيلم:', movieId);
    
    // التأكد من أن movieId مش undefined أو null
    if (!movieId || movieId === 'movie-detail.html' || movieId.includes('?')) {
        console.error('❌ معرف فيلم غير صالح');
        showErrorPage();
        return;
    }
    
    const movie = MovieDB.getById(movieId);
    const container = document.getElementById('movieDetail');
    
    if (!movie) {
        console.error('❌ الفيلم غير موجود للمعرف:', movieId);
        showErrorPage();
        return;
    }
    
    if (!container) return;
    
    // تحديث عنوان الصفحة
    document.title = movie.seo?.title || `ملخص ${movie.type === 'movie' ? 'فيلم' : 'مسلسل'} ${movie.title} | بصمة ملخص`;
    
    // تحديث Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', movie.seo?.description || movie.summary.substring(0, 160));
    }
    
    // تحديث Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && movie.seo?.keywords) {
        metaKeywords.setAttribute('content', movie.seo.keywords);
    }
    
    // تحديث Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
        canonical.setAttribute('href', `${baseUrl}/movie-detail.html?id=${movie.id}`);
    }
    
    // عرض المحتوى
    container.innerHTML = generateMovieHTML(movie);
    
    console.log('✅ تم عرض التفاصيل بنجاح');
}

// دالة مساعدة لعرض صفحة الخطأ
function showErrorPage() {
    const container = document.getElementById('movieDetail');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-container" style="text-align: center; padding: 3rem; background: rgba(0,0,0,0.3); border-radius: 2rem;">
            <i class="fas fa-exclamation-circle" style="font-size: 4rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
            <h2 style="color: #ff6b6b; margin-bottom: 1rem;">الفيلم غير موجود</h2>
            <p style="color: #8888aa; margin-bottom: 2rem;">عذراً، لم نتمكن من العثور على الفيلم المطلوب</p>
            <a href="index.html" class="btn-back" style="background: #ffb347; color: #0a0a12; padding: 0.8rem 2rem; border-radius: 2rem; text-decoration: none; display: inline-block;">
                <i class="fas fa-home"></i> العودة للرئيسية
            </a>
        </div>
    `;
}

// دالة مساعدة لتوليد HTML الفيلم
function generateMovieHTML(movie) {
    return `
        <div class="detail-header">
            <div class="detail-poster">
                ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title}" loading="lazy">` : '<i class="fas fa-film"></i>'}
            </div>
            <div class="detail-info">
                <h1 class="detail-title">${escapeHTML(movie.title)}</h1>
                <div class="detail-meta">
                    <span class="detail-meta-item">
                        <i class="fas fa-calendar"></i> ${escapeHTML(movie.year)}
                    </span>
                    <span class="detail-meta-item">
                        <i class="fas fa-user-tie"></i> ${escapeHTML(movie.director)}
                    </span>
                    ${movie.duration ? `
                    <span class="detail-meta-item">
                        <i class="fas fa-clock"></i> ${escapeHTML(movie.duration)}
                    </span>` : ''}
                    ${movie.language ? `
                    <span class="detail-meta-item">
                        <i class="fas fa-language"></i> ${escapeHTML(movie.language)}
                    </span>` : ''}
                </div>
                <div class="detail-rating">
                    <i class="fas fa-star"></i> ${escapeHTML(movie.rating)}
                </div>
                ${movie.genres ? `
                <div class="detail-genres">
                    ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h2><i class="fas fa-scroll"></i> الملخص القصير</h2>
            <p>${escapeHTML(movie.summary)}</p>
        </div>
        
        <div class="detail-section">
            <h2><i class="fas fa-book-open"></i> الملخص التفصيلي</h2>
            <p style="white-space: pre-line;">${escapeHTML(movie.detailed)}</p>
        </div>
        
        ${movie.cast ? `
        <div class="detail-section">
            <h2><i class="fas fa-users"></i> طاقم التمثيل</h2>
            <div class="cast-list">
                ${movie.cast.map(actor => `<span class="cast-item">${actor}</span>`).join('')}
            </div>
        </div>` : ''}
        
        <div class="detail-note">
            <h2><i class="fas fa-lightbulb"></i> ملاحظات ودروس</h2>
            <p>${escapeHTML(movie.note)}</p>
        </div>
    `;
}
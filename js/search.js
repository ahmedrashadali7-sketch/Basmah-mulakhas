// ========== دوال البحث ==========

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const path = window.location.pathname;
        const currentPage = path.split('/').pop() || 'index.html';
        
        let container, filtered;
        
        if (currentPage === 'top-rated.html') {
            container = document.getElementById('topRatedContainer');
            filtered = MovieDB.search(searchTerm);
            displayTopRatedResults(filtered, container);
        } else {
            container = document.getElementById('moviesContainer');
            
            if (currentPage === 'movies.html') {
                filtered = MovieDB.search(searchTerm).filter(m => m.type === 'movie');
            } else if (currentPage === 'tvshows.html') {
                filtered = MovieDB.search(searchTerm).filter(m => m.type === 'tvshow');
            } else {
                filtered = MovieDB.search(searchTerm);
            }
            
            displayMovieResults(filtered, container);
        }
    });
}

function displayMovieResults(items, container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
        return;
    }
    
    items.forEach((item, index) => {
        container.appendChild(createMovieCard(item, index));
    });
}

function displayTopRatedResults(items, container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
        return;
    }
    
    items.forEach((item, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'top-rated-item';
        rankItem.style.animationDelay = `${index * 0.05}s`;
        rankItem.onclick = () => window.location.href = MovieDB.getMovieUrl(item);
        
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
}
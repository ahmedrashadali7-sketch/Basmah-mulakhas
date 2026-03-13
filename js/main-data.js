// ========== دمج بيانات الأفلام والمسلسلات ==========
const allMoviesData = [...moviesData, ...tvshowsData];

// ========== دوال مساعدة للبيانات ==========
const MovieDB = {
    // جلب جميع الأفلام والمسلسلات
    getAll: function() {
        return allMoviesData;
    },
    
    // جلب فيلم بواسطة ID
    getById: function(id) {
        return allMoviesData.find(m => m.id == id);
    },
    
    // جلب الأفلام فقط
    getMovies: function() {
        return moviesData;
    },
    
    // جلب المسلسلات فقط
    getTVShows: function() {
        return tvshowsData;
    },
    
    // جلب الأعلى تقييماً
    getTopRated: function(limit = 10) {
        return [...allMoviesData].sort((a, b) => {
            const ratingA = parseFloat(a.rating.split('/')[0]);
            const ratingB = parseFloat(b.rating.split('/')[0]);
            return ratingB - ratingA;
        }).slice(0, limit);
    },
    
    // البحث في البيانات
    search: function(term) {
        term = term.toLowerCase();
        return allMoviesData.filter(item => 
            item.title.toLowerCase().includes(term) ||
            item.director.toLowerCase().includes(term)
        );
    },
    
    // الحصول على رابط الفيلم
    getMovieUrl: function(movie) {
        return `movie-detail.html?id=${movie.id}`;
    },
    
    // إحصائيات سريعة
    getStats: function() {
        return {
            totalMovies: this.getMovies().length,
            totalTVShows: this.getTVShows().length,
            total: allMoviesData.length,
            averageRating: this.calculateAverageRating()
        };
    },
    
    // حساب متوسط التقييم
    calculateAverageRating: function() {
        if (allMoviesData.length === 0) return '0';
        let total = 0;
        allMoviesData.forEach(item => {
            const rating = parseFloat(item.rating.split('/')[0]);
            if (!isNaN(rating)) total += rating;
        });
        return (total / allMoviesData.length).toFixed(1);
    }
};
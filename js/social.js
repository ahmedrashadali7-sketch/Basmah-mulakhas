// ========== دوال المشاركة الاجتماعية ==========

window.shareOnFacebook = function() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank', 'width=600,height=400');
};

window.shareOnTwitter = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
};

window.shareOnWhatsApp = function() {
    const text = encodeURIComponent(`${document.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
};

window.shareOnTelegram = function() {
    const text = encodeURIComponent(`${document.title} - ${window.location.href}`);
    window.open(`https://t.me/share/url?url=${window.location.href}&text=${text}`, '_blank');
};

window.shareOnLinkedIn = function() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
};

window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('✅ تم نسخ الرابط بنجاح');
    }).catch(() => {
        alert('❌ فشل نسخ الرابط');
    });
};

function enhanceSocialSharing() {
    if (!document.querySelector('.movie-detail-container')) return;
    if (document.querySelector('.share-buttons')) return;
    
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    shareButtons.innerHTML = `
        <h3><i class="fas fa-share-alt"></i> شارك هذا المحتوى</h3>
        <div class="share-grid">
            <a href="#" onclick="shareOnFacebook()" class="share-btn facebook">
                <i class="fab fa-facebook-f"></i> فيسبوك
            </a>
            <a href="#" onclick="shareOnTwitter()" class="share-btn twitter">
                <i class="fab fa-x-twitter"></i> تويتر
            </a>
            <a href="#" onclick="shareOnWhatsApp()" class="share-btn whatsapp">
                <i class="fab fa-whatsapp"></i> واتساب
            </a>
            <a href="#" onclick="shareOnTelegram()" class="share-btn telegram">
                <i class="fab fa-telegram-plane"></i> تيليجرام
            </a>
            <a href="#" onclick="shareOnLinkedIn()" class="share-btn linkedin">
                <i class="fab fa-linkedin-in"></i> لينكد إن
            </a>
            <a href="#" onclick="copyLink()" class="share-btn copy">
                <i class="fas fa-link"></i> نسخ الرابط
            </a>
        </div>
    `;
    
    const detailContainer = document.querySelector('.movie-detail-container');
    if (detailContainer) {
        detailContainer.appendChild(shareButtons);
    }
}
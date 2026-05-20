document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.photos img');
    
    if (galleryImages.length === 0) return;

    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    const lightboxClose = document.createElement('span');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '&times;';
    
    const lightboxPrev = document.createElement('span');
    lightboxPrev.className = 'lightbox-prev';
    lightboxPrev.innerHTML = '&#10094;';
    
    const lightboxNext = document.createElement('span');
    lightboxNext.className = 'lightbox-next';
    lightboxNext.innerHTML = '&#10095;';

    
    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxPrev);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxNext);
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    const imagesArray = Array.from(galleryImages);

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imagesArray[currentIndex].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

   
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; 
    }

  
    function showNext() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex].src;
    }

   
    function showPrev() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex].src;
    }

   
    imagesArray.forEach((img, index) => {
        img.style.cursor = 'pointer'; 
        img.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

   
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});

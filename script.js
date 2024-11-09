const setupButtons = (carousel) => {
  const nav = carousel.querySelector('.carousel__nav');
  const maxItems = parseInt(/\d+/.exec(carousel.getAttribute('style'))[0]);
  const imgAmount = carousel.querySelectorAll('.carousel__img').length;
  const maxIndex = Math.ceil(imgAmount / maxItems) - 1;

  nav.querySelector('.carousel__button--prev').addEventListener('click', _ => {
    const index = parseInt(/\d+/.exec(nav.getAttribute('style'))[0]);
    if (index === 0) {
      nav.style = `--slider-index: ${maxIndex}`;
      return
    };
    nav.style = `--slider-index: ${index - 1}`;
  });
  nav.querySelector('.carousel__button--next').addEventListener('click', _ => {
    const index = parseInt(/\d+/.exec(nav.getAttribute('style'))[0]);
    if (index === maxIndex) {
      nav.style = `--slider-index: 0`;
      return
    }
    nav.style = `--slider-index: ${index + 1}`;
  });
}

const setupImageSelection = (carousel) => {
  const figureImg = carousel.querySelector('.carousel__preview img');
  const figureCaption = carousel.querySelector('.carousel__preview figcaption');
  const images = carousel.querySelectorAll('.carousel__img');

  images.forEach(image => {
    image.addEventListener('click', _ => {
      if (image.classList.contains('carousel__img--active')) return;
      images.forEach(img => img.classList.remove('carousel__img--active'));
      image.classList.add('carousel__img--active');

      figureImg.src = image.getAttribute('src');
      figureCaption.textContent = image.getAttribute('caption');
    });
  });
}

const toggleOverlay = (enable = false) => {
  const overlay = document.querySelector('.preview-overlay');
  if (!enable) {
    overlay.style = 'display: none';
    return;
  };
  overlay.style = 'display: flex';
}

const setupImagePreviewOverlay = (carousel) => {
  const figureImg = carousel.querySelector('.carousel__preview img');
  const figureCaption = carousel.querySelector('.carousel__preview figcaption');
  const overlayCloseBg = document.querySelector('.preview-overlay__close');
  const overlayCloseIcon = document.querySelector('.preview-overlay__close-icon');
  const overlayImg = document.querySelector('.preview-overlay__img');

  figureImg.addEventListener('click', _ => {
    toggleOverlay(true);
    overlayImg.src = figureImg.src;
    overlayImg.alt = figureCaption.textContent;
  });
  overlayCloseBg.addEventListener('click', _ => toggleOverlay());
  overlayCloseIcon.addEventListener('click', _ => toggleOverlay());
}

const initCarousels = _ => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    setupButtons(carousel);
    setupImageSelection(carousel);
    setupImagePreviewOverlay(carousel);
  });
}

document.addEventListener('DOMContentLoaded', _ => {
  initCarousels();
});

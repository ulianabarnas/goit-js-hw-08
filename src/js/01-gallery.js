import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createImageGalleryMarkup(galleryItems);

galleryContainer.innerHTML = imagesMarkup;

function createImageGalleryMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
    })
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

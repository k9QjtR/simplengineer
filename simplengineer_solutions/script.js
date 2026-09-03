const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const serviceSelect = document.querySelector('#booking-service');
const appointmentType = document.querySelector('#appointment-type');
const bookingPrice = document.querySelector('#booking-price');
const bookingButton = document.querySelector('#square-booking-button');

function updateBooking() {
  const selected = serviceSelect.options[serviceSelect.selectedIndex];
  const ready = serviceSelect.value && appointmentType.value;
  bookingPrice.textContent = serviceSelect.value
    ? (selected.dataset.price === 'Custom' ? 'Custom quote' : `${selected.dataset.price}+`)
    : 'Choose a service';
  bookingButton.classList.toggle('disabled', !ready);
  bookingButton.setAttribute('aria-disabled', String(!ready));
}

serviceSelect.addEventListener('change', updateBooking);
appointmentType.addEventListener('change', updateBooking);
bookingButton.addEventListener('click', event => {
  if (bookingButton.getAttribute('aria-disabled') === 'true') event.preventDefault();
});

const serviceSearchInput = document.querySelector('#service-search-input');
const serviceSearchClear = document.querySelector('#service-search-clear');
const serviceSearchStatus = document.querySelector('#service-search-status');
const serviceSearchEmpty = document.querySelector('#service-search-empty');
const serviceCards = [...document.querySelectorAll('.service-grid article')];

function filterServices() {
  const query = serviceSearchInput.value.trim().toLowerCase();
  let matches = 0;

  serviceCards.forEach(card => {
    const searchableText = `${card.textContent} ${card.dataset.search || ''}`.toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const visible = !query || terms.every(term => searchableText.includes(term));
    card.hidden = !visible;
    if (visible) matches += 1;
  });

  serviceSearchClear.hidden = !query;
  serviceSearchEmpty.hidden = matches !== 0;
  serviceSearchStatus.textContent = query
    ? `${matches} service${matches === 1 ? '' : 's'} found`
    : `Showing all ${serviceCards.length} services`;
}

serviceSearchInput.addEventListener('input', filterServices);
serviceSearchClear.addEventListener('click', () => {
  serviceSearchInput.value = '';
  filterServices();
  serviceSearchInput.focus();
});

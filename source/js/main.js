import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });


  let promoLink = document.querySelector('[data-promo-link]');
  let aboutButton = document.querySelector('[data-about-button]');
  let aboutAdditional = document.querySelector('[data-about-additional]');
  let catalogHeader = document.querySelector('[data-catalog-header]');
  let footerHeadingWrapper1 = document.querySelector('[data-heading-wrapper-1]');
  let footerHeadingWrapper2 = document.querySelector('[data-heading-wrapper-2]');
  let footerButton1 = document.querySelector('[data-footer-button-1]');
  let footerButton2 = document.querySelector('[data-footer-button-2]');
  let footerNav1 = document.querySelector('[data-nav-list-1]');
  let footerNav2 = document.querySelector('[data-nav-list-2]');
  let footerContacts = document.querySelector('[data-contacts-list]');

  // promo + catalog

  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      promoLink.innerHTML = 'Получить бесплатную консультацию';
      catalogHeader.innerHTML = 'Smart Device предлагает следующие товары и услуги';

    } else {
      promoLink.innerHTML = 'бесплатная консультация';
      catalogHeader.innerHTML = 'Товары и услуги Smart Device';
    }
  });

  // about
  aboutButton.classList.remove('about__button--nojs');
  aboutAdditional.classList.add('is-hidden');

  // почему-то без этого первый клик не работает
  aboutButton.innerHTML = 'Подробнее';

  aboutButton.addEventListener('click', function () {
    aboutAdditional.classList.toggle('is-hidden');
    if (aboutButton.innerHTML === 'Подробнее') {
      aboutButton.innerHTML = 'Скрыть';
    } else {
      aboutButton.innerHTML = 'Подробнее';
    }
  });

  // input
  [].forEach.call(document.querySelectorAll('[data-phone-input]'), function (inputElement) {

    inputElement.setAttribute('maxlength', 18);

    inputElement.addEventListener('focus', () => {
      if (inputElement.value.length === 0) {
        inputElement.value = '+7 (';
        inputElement.selectionStart = inputElement.value.length;
      }
    });

    inputElement.addEventListener('blur', () => {
      if (inputElement.value.length < 18) {
        inputElement.value = '';
      }
    });

    inputElement.addEventListener('click', () => {
      if (inputElement.selectionStart < 4) {
        inputElement.selectionStart = inputElement.value.length;
      }
    });

    inputElement.addEventListener('keypress', (evt) => {
      if (evt.keyCode < 47 || evt.keyCode > 57) {
        evt.preventDefault();
      }
    });

    inputElement.addEventListener('keydown', (evt) => {
      if (evt.key === 'Backspace' && inputElement.value.length <= 4) {
        evt.preventDefault();
      }
      if (evt.key === 'Delete' && inputElement.value.length <= 4) {
        evt.preventDefault();
      }
    });

    inputElement.oninput = () => {
      const nums = inputElement.value.split(/[ ()+]+/).join('');
      let cursorPosition = inputElement.selectionStart;
      if (nums.length > 9) {
        inputElement.value = '+' + nums.slice(0, 1) + ' (' + nums.slice(1, 4) + ') ' + nums.slice(4, 7) + ' ' + nums.slice(7, 9) + ' ' + nums.slice(9, nums.length);
      } else
      if (nums.length > 7) {
        inputElement.value = '+' + nums.slice(0, 1) + ' (' + nums.slice(1, 4) + ') ' + nums.slice(4, 7) + ' ' + nums.slice(7, nums.length);
      } else
      if (nums.length > 4) {
        inputElement.value = '+' + nums.slice(0, 1) + ' (' + nums.slice(1, 4) + ') ' + nums.slice(4, nums.length);
        cursorPosition = cursorPosition + 2;
      } else
      if (nums.length > 1) {
        inputElement.value = '+' + nums.slice(0, 1) + ' (' + nums.slice(1, nums.length);
      }
      if (inputElement.value.slice(cursorPosition - 1, cursorPosition) === ' ') {
        cursorPosition++;
      }
      if (inputElement.value.slice(cursorPosition - 2, cursorPosition - 1) === ')') {
        cursorPosition = cursorPosition + 2;
      }

      inputElement.selectionStart = cursorPosition;
      inputElement.selectionEnd = cursorPosition;
    };
  });

  // footer menu
  footerButton1.classList.remove('footer__button--nojs');
  footerButton2.classList.remove('footer__button--nojs');
  footerNav1.classList.remove('footer__list--nojs');
  footerNav2.classList.remove('footer__list--nojs');
  footerContacts.classList.remove('footer__list--nojs');

  footerHeadingWrapper1.addEventListener('click', function () {
    footerButton1.classList.toggle('footer__button--list-opened');
    footerNav1.classList.toggle('footer__list--opened');
    footerNav2.classList.toggle('footer__list--opened');
    footerButton2.classList.remove('footer__button--list-opened');
    footerContacts.classList.remove('footer__list--opened');
  });

  footerHeadingWrapper2.addEventListener('click', function () {
    footerButton2.classList.toggle('footer__button--list-opened');
    footerContacts.classList.toggle('footer__list--opened');
    footerButton1.classList.remove('footer__button--list-opened');
    footerNav1.classList.remove('footer__list--opened');
    footerNav2.classList.remove('footer__list--opened');
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

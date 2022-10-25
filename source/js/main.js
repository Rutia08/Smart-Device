import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  //  маска для поля ввода телефона (https://web-revenue.ru/verstka/maska-vvoda-telefona-v-input-na-js)
  [].forEach.call(document.querySelectorAll('[data-phone-input]'), function (input) {
    function mask(event) {
      let keyCode = event.keyCode;
      let pos = input.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      let matrix = '+7 (___) ___ __ __';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = input.value.replace(/\D/g, '');
      let newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });

      i = newValue.indexOf('_');

      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }

      let reg = matrix.substring(0, input.value.length).replace(/_+/g, function (a) {
        return '\\d{1,' + a.length + '}';
      }).replace(/[+()]/g, '\\$&');

      reg = new RegExp('^' + reg + '$');

      if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
        input.value = newValue;
      }

      if (event.type === 'blur' && input.value.length < 5) {
        input.value = '';
      }
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  });

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

// мой js

let aboutButton = document.querySelector('[data-about-button]');
let aboutAdditional = document.querySelector('[data-about-additional]');

// data-heading-wrapper
let footerHeadingWrapper1 = document.querySelector('[data-heading-wrapper-1]');
let footerHeadingWrapper2 = document.querySelector('[data-heading-wrapper-2]');
let footerButton1 = document.querySelector('[data-footer-button-1]');
let footerButton2 = document.querySelector('[data-footer-button-2]');
let footerNav1 = document.querySelector('[data-nav-list-1]');
let footerNav2 = document.querySelector('[data-nav-list-2]');
let footerContacts = document.querySelector('[data-contacts-list]');

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

// footer menu
footerButton1.classList.remove('footer__button--nojs');
footerButton2.classList.remove('footer__button--nojs');

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

/**
* Template Name: NiceRestaurant
* Template URL: https://bootstrapmade.com/nice-restaurant-bootstrap-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  // scrollTop.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// CHATBOT
function toggleChat() {
    const chat = document.getElementById("chat-container");
    chat.style.display = (chat.style.display === "none" || chat.style.display === "") ? "block" : "none";
}

function enviarMensaje() {
    let mensaje = document.getElementById("mensaje").value.trim();
    if (mensaje === "") return;

    let chatBox = document.getElementById("chat-box");

    // Burbuja del usuario
    let msgUsuario = document.createElement("div");
    msgUsuario.style.alignSelf = "flex-end";
    msgUsuario.style.color = "#5a3b2e"; // cálido claro
    msgUsuario.style.padding = "8px 12px";
    msgUsuario.style.borderRadius = "18px 18px 0 18px";
    msgUsuario.style.maxWidth = "80%";
    msgUsuario.style.fontSize = "14px";
    msgUsuario.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    msgUsuario.textContent = mensaje;
    chatBox.appendChild(msgUsuario);

    fetch("forms/chatbot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "mensaje=" + encodeURIComponent(mensaje)
    })
    .then(response => response.text())
    .then(data => {
        let msgBot = document.createElement("div");
        msgBot.style.alignSelf = "flex-start";
        msgBot.style.color = "#35241dff";  // cálido neutro
        msgBot.style.padding = "8px 12px";
        msgBot.style.borderRadius = "18px 18px 18px 0";
        msgBot.style.maxWidth = "80%";
        msgBot.style.fontSize = "14px";
        msgBot.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
        msgBot.textContent = data;
        chatBox.appendChild(msgBot);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    document.getElementById("mensaje").value = "";
}

function respuestaRapida(texto) {
    enviarMensajeDesdeBoton(texto);
}

function enviarMensajeDesdeBoton(texto) {
    let chatBox = document.getElementById("chat-box");

    // Mensaje del usuario
    let msgUsuario = document.createElement("div");
    msgUsuario.style.alignSelf = "flex-end";
    msgUsuario.style.color = "#5a3b2e";
    msgUsuario.style.padding = "8px 12px";
    msgUsuario.style.borderRadius = "18px 18px 0 18px";
    msgUsuario.style.maxWidth = "80%";
    msgUsuario.style.fontSize = "14px";
    msgUsuario.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    msgUsuario.textContent = texto;
    chatBox.appendChild(msgUsuario);

    // Fetch al backend
    fetch("forms/chatbot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "mensaje=" + encodeURIComponent(texto)
    })
    .then(response => response.text())
    .then(data => {
        let msgBot = document.createElement("div");
        msgBot.style.alignSelf = "flex-start";
        msgBot.style.color = "#35241dff";
        msgBot.style.padding = "8px 12px";
        msgBot.style.borderRadius = "18px 18px 18px 0";
        msgBot.style.maxWidth = "80%";
        msgBot.style.fontSize = "14px";
        msgBot.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
        msgBot.textContent = data;
        chatBox.appendChild(msgBot);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// mensaje de bienvenidas
let bienvenidaMostrada = false;

function toggleChat() {
  const chat = document.getElementById("chat-container");
  const chatBox = document.getElementById("chat-box");

  const abierto = chat.classList.contains("show");

  if (abierto) {
    chat.classList.remove("show");
    chat.classList.add("hide");

    setTimeout(() => {
      chat.style.display = "none";
    }, 300); // tiempo igual al fadeOut
  } else {
    chat.classList.remove("hide");
    chat.style.display = "block";

    setTimeout(() => {
      chat.classList.add("show");
    }, 10); // pequeño delay para activar la animación

    if (!bienvenidaMostrada) {
      const bienvenida = document.createElement("div");
      bienvenida.textContent = "¡Hola! 👋 Soy MunBot y estoy aquí para ayudarte. ¿Sobre qué te gustaría saber?";
      bienvenida.style.alignSelf = "flex-start";
      bienvenida.style.color = "#35241dff";
      bienvenida.style.padding = "8px 12px";
      bienvenida.style.borderRadius = "18px 18px 18px 0";
      bienvenida.style.maxWidth = "80%";
      bienvenida.style.fontSize = "14px";
      bienvenida.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
      chatBox.appendChild(bienvenida);
      chatBox.scrollTop = chatBox.scrollHeight;
      bienvenidaMostrada = true;
    }
  }
}



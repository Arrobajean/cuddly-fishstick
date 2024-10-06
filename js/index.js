// PAGE EFFECT AFTER LOADING
window.addEventListener("load", function () {
  const loadertext = document.querySelector(".loader-text-stroke");
  const pagination = document.querySelector(".swiper-pagination");

  // Ocultar la paginación mientras el loader está activo
  if (pagination) {
    pagination.style.display = "none"; // Ocultar paginación inicialmente
  }

  if (loadertext) {
    loadertext.addEventListener("animationend", function () {
      gsap.to(loadertext, {
        opacity: 0,
        duration: 0.8,
        onComplete: function () {
          loadertext.style.display = "none";
          gsap.to("#loader", {
            y: "-100%",
            duration: 1.2,
            ease: "Expo.easeInOut",

            onComplete: function () {
              // Mostrar la paginación después de que el loader termine su animación
              if (pagination) {
                pagination.style.display = "block"; // Mostrar paginación

                // Animación sutil para la aparición de la paginación
                gsap.fromTo(
                  pagination,
                  {
                    opacity: 0,
                    y: 20, // Empieza ligeramente abajo
                  },
                  {
                    opacity: 1,
                    y: 0, // Se desplaza suavemente a su posición final
                    duration: 1, // Duración más suave
                    ease: "power2.out", // Suavizado para la animación
                  }
                );
              }
            },
          });
        },
      });
    });
  }
});

// PAGE EFFECT AFTER LOADING

// MASONRY ON GALLERY PAGE
document.addEventListener("DOMContentLoaded", function () {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (galleryGrid) {
    // Inicializamos Masonry
    const masonryInstance = new Masonry(galleryGrid, {
      itemSelector: ".column",
      isAnimated: true,
    });

    const pagelinks = document.querySelectorAll(".page-link");
    pagelinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Solo actualizamos el layout en lugar de recrear Masonry
        setTimeout(() => {
          masonryInstance.layout();
        }, 2000);
      });
    });
  }
});

// GALLERY PAGE SLIDER

new Swiper(" .swiper-container", {
  slidesPerView: "auto",
  speed: 1000,
  spaceBetween: 20,
  centeredSlides: true,
  grabCursor: true,
  on: {
    init: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        $(swiper.slides[i])
          .find(".img-container")
          .attr({
            "data-swiper-parallax": 1 * swiper.width,
          });
      }
    },
    resize: function () {
      this.update();
    },
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: true,
  },
  pagination: {
    el: "#home .swiper-pagination",
    type: "fraction",
  },
  mousewheel: true,
  observer: true,
  observeParents: true,
});
// SLIDER ON GALLERY PAGE

$(document).ready(function () {
  $(".image-type").lettering();
});

//DISPLAY NAVIGATION CONTENT ON MENUBAR CLICK
$(function () {
  $(".menu-bar").on("click", function () {
    //WHEN MENUBAR IS CLICKED BRING NAVIGATION UP
    gsap.to("#navigation", 1, {
      y: "0%",
      ease: "Expo.easeInOut",
      onComplete: function () {
        //WHEN NAVIGATION ANIMATION IS COMPLETED DO THE FOLLOWING
        gsap.to(".navigation-opacity", 0.5, {
          //GET ELEMENTS OF CLASS 'NAVIGATION-OPACITY' AND TURN THEIR OPACITY TO 1
          opacity: 1,
          stagger: 0.1,
        });
      },
    });

    // Ocultar la paginación cuando se abre el menú
    hidePagination();
  });

  $(".navigation-close").on("click", function () {
    //WHEN NAVIGATION CLOSE IS CLICKED ANIMATE NAVIGATION DOWN
    gsap.to(".navigation-opacity", 0.5, {
      //GET ELEMENTS OF CLASS 'NAVIGATION-OPACITY' AND TURN THEIR OPACITY TO 0
      opacity: 0,
      stagger: 0.05,
      onComplete: function () {
        //WHEN OPACITY ANIMATION IS COMPLETED DO THE FOLLOWING
        gsap.to("#navigation", 1, {
          y: "100%",
          ease: "Expo.easeInOut",
        });

        // Mostrar la paginación nuevamente cuando se cierre el menú
        showPagination();
      },
    });
  });
});

// PAGE TRANSITIONS
$(function () {
  const $links = $(".page-link"); // Obtener todos los elementos con clase 'page-link'
  const $breaker = $("#breaker"); // Obtener el elemento con ID 'breaker'
  const transitionColor = "#abb8c3"; // Color de transición tomado del CSS

  // Asegurarnos de que haya enlaces y un breaker
  if ($links.length && $breaker.length) {
    $links.on("click", function (e) {
      e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

      const page = $(this).attr("href"); // Obtener el valor del href del enlace

      // Asegurarnos de que la página de destino exista
      if ($(page).length) {
        displayBreaker($breaker); // Mostrar la animación del breaker
        changePage(page, $links); // Cambiar el contenido de la página
      }
    });
  }
});

// Función para mostrar la animación del breaker
function displayBreaker($breaker) {
  $breaker.css("display", "block"); // Mostrar el breaker

  $breaker.on("animationend", function () {
    $(this).css("display", "none"); // Ocultar el breaker al finalizar la animación
  });

  // Animar la opacidad de la navegación y ocultarla
  gsap.to(".navigation-opacity", {
    opacity: 0,
    duration: 0.5,
    stagger: -0.05,
    onComplete: function () {
      gsap.to("#navigation", {
        y: "100%",
        duration: 1,
        ease: "Expo.easeInOut",
      });
    },
  });
}

// Función para cambiar el contenido de la página
function changePage(page, $links) {
  const pages = $links
    .map(function () {
      return $(this).attr("href");
    })
    .get(); // Obtener todas las páginas

  // Retraso para asegurar que la transición termine antes de mostrar la nueva página
  setTimeout(function () {
    // Ocultar todas las páginas
    pages.forEach(function (a) {
      $(a).css("display", "none");
    });

    // Mostrar la página seleccionada
    $(page).fadeIn(400, function () {
      // Restaurar el color de fondo después de que la nueva página se muestre
      gsap.to("body", {
        backgroundColor: "#000000", // Color de fondo del cuerpo restaurado a negro
        duration: 0.5,
      });
    });
  }, 1500); // Retraso de 1.5 segundos para sincronizar con la animación
}

//PAGE TRANSITION

// SORTING OF IMAGES

$(function () {
  var sortingbuttons = document.querySelectorAll(".image-sort-button"); //GET ALL IMAGE SORTING BUTTON THEY HAVE A CLASS OF 'IMAGE-SORT-BUTTON'
  var images = [...document.querySelectorAll(".gallery-img")]; //GET ALL IMAGES WITH CLASS 'GALLERY-IMG'

  //SORT IMAGES
  sortingbuttons.forEach((button) =>
    button.addEventListener("click", function () {
      var sortvalue = button.dataset.sort; //GET VALUE OF THE 'DATA-SORT' FROM BUTTON WHICH HAS BEEN CLICKED

      images.forEach((image) => (image.style.display = "none")); //GET ALL THE IMAGES AND SET THEIR DISPLAY TO NONE

      var imagestoshown = document.querySelectorAll(`[alt='${sortvalue}']`); //GET ALL THE IMAGES WHICH WE NEED TO SHOW

      imagestoshown.forEach((show) => (show.style.display = "block")); //SET IMAGES TO BLOCK

      if (sortvalue == "all") {
        //IF BUTTON "ALL" IS CLICKED SET ALL IMAGES TO BLOCK
        images.forEach((image) => (image.style.display = "block"));
      }
      //SORT IMAGES

      //SET NEW MASONRY
      new Masonry(".gallery-grid", {
        itemSelector: ".column",
        isAnimated: true,
      });
      //SET NEW MASONRY

      //CHANGE BUTTON STYLE
      sortingbuttons.forEach((buttons) => buttons.classList.remove("active")); //REMOVE CLASSLIST OF ACTIVE FROM CURRENT BUTTON
      button.classList.add("active"); // ADD CLASS LIST OF ACTIVE TO THE BUTTON WHICH HAS BEEN CLICKED

      //CHANGE BUTTON STYLE
    })
  );
});

function hidePagination() {
  const pagination = document.querySelector(".swiper-pagination");
  if (pagination) {
    gsap.to(pagination, {
      opacity: 0,
      duration: 0.8,
      onComplete: function () {
        pagination.style.display = "none";
      },
    });
  }
}
function showPagination() {
  const pagination = document.querySelector(".swiper-pagination");
  if (pagination) {
    pagination.style.display = "block"; // Mostrar el elemento nuevamente
    gsap.to(pagination, {
      opacity: 1,
      duration: 0.8,
    });
  }
}

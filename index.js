class App {
  constructor() {
    this._initialize();
    this._render();
  }

  _initialize() {
    this._createLenis();
  }


  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1
    })
  }

  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }
}


new App();

gsap.registerPlugin(ScrollTrigger);

gsap.to('.parallax-background', {
  yPercent: 50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
});


gsap.fromTo('.row', { xPercent: 10 }, {
  xPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.row',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.fromTo('.parallax-background', { opacity: 0, y: 160, rotation: 5, transformOrigin: "-111em -1em", }, { rotation: 0, opacity: 1, y: 0, duration: 1.4, ease: "power1.out" });

gsap.fromTo('.second-row', { xPercent: -10 }, {
  xPercent: 10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.row',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});


// Make the header sticky on scroll
ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    const header = document.querySelector('.sticky-header');
    if (self.direction === 1) {
      header.style.position = 'fixed';
      header.style.top = '0';
    } else if (self.scroll() === 0) {
      header.style.position = 'absolute';
    }
  }
});


gsap.utils.toArray(".gallery-section-container h2, .first-header-content h1, .first-header-content p, .title-blacked-section h2, .title h2").forEach((element, index) => {
  gsap.fromTo(element,
    {
      y: 3, opacity: 0, rotation:2,
      transformOrigin: "-11em -1em",
    }, 
    {
      duration: 1,
      y: 0,
      rotation: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 95%", 
        toggleActions: "play none none none"
      },
      delay: index * 0.1, 
    }
  );
});




const link = document.querySelector('.visit-website-link');
const iconCircle = link.querySelector('.icon-circle');

link.addEventListener('mouseenter', () => {
  gsap.to(iconCircle, { x: 0, opacity: 1, scale: 1, duration: 0.3, startAt: { scale: 0 } });
  gsap.to(link, { x: 20, duration: 0.15 });
});

link.addEventListener('mouseleave', () => {
  gsap.to(iconCircle, { x: -25, opacity: 0, scale: 0, duration: 0.3 });
  gsap.to(link, { x: 0, duration: 0.3 });
});



//code to change menu and logo color dynamically 

document.addEventListener("DOMContentLoaded", function () {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  gsap.utils.toArray('.section').forEach((section, index, sections) => {
    ScrollTrigger.create({
      trigger: section,
      start: `top ${navbarHeight}px`,
      end: "bottom bottom",
      onEnter: ({ direction }) => updateNavbar(section.getAttribute('data-color')),
      onLeave: ({ direction }) => {
        // When leaving the section downwards, adjust for the next section if it exists
        if (direction === 1 && sections[index + 1]) {
          updateNavbar(sections[index + 1].getAttribute('data-color'));
        }
      },
      onEnterBack: ({ direction }) => updateNavbar(section.getAttribute('data-color')),
      onLeaveBack: ({ direction }) => {
        // When leaving the section upwards, adjust for the previous section if it exists
        if (direction === -1 && sections[index - 1]) {
          updateNavbar(sections[index - 1].getAttribute('data-color'));
        }
      }
    });
  });

  function updateNavbar(color) {
    const navBarClass = color === 'dark' ? 'dark-links' : 'light-links';
    document.querySelector('.navbar').className = 'navbar ' + navBarClass;
    const borderColor = color === 'dark' ? '#fff' : '#000';
    document.documentElement.style.setProperty('--border-hover-color', borderColor);
  }

});

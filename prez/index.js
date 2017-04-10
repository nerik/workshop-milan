Promise.all(['./slides.json','./decks.json'].map(url => fetch(url)
  .then(resp => resp.text())))
  .then(data => {
    const slides = JSON.parse(data[0]);
    const decks = JSON.parse(data[1]);
    console.log(slides, decks);

    const milanDeck = decks['workshop-milan'];
    const milanSlides = milanDeck.slides.map(rawSlide => {
      let slide = slides.find(s => s.id === rawSlide);
      if (slide === undefined) {
        slide = rawSlide;
      } else {
        slide.url = `${slide.id}.${slide.ext}`;
        if (slide.title === '') {
          slide.title = slide.id.replace('-',' ');
        }
      }
      return slide;
    });

    // console.log(milanSlides);

    const template = _.template(document.getElementById('tpl-slides').innerText);

    document.getElementById('slides').innerHTML = template({
      slides: milanSlides
    });

    let currentSlideIndex;
    const slidesSections = document.querySelectorAll('section');
    const numSlides = slidesSections.length;

    const gotoSlide = (slideIndex) => {
      currentSlideIndex = Math.min(numSlides - 1, Math.max(0, slideIndex));
      document.querySelectorAll('section').forEach((slide, index) => {
        if (index === slideIndex) {
          slide.classList.add('-current');
        } else {
          slide.classList.remove('-current');
        }
      });
      window.location.hash = currentSlideIndex;
    };

    document.addEventListener('keydown', e => {
      if (e.keyCode === 39) { // right
        gotoSlide(currentSlideIndex +1);
      } else if (e.keyCode === 37) { // left
        gotoSlide(currentSlideIndex - 1);
      }
    });

    gotoSlide((window.location.hash === '') ? 0 : parseInt(window.location.hash.substr(1)));
  });

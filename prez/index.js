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
      }
      return slide;
    });

    console.log(milanSlides)

    const template = _.template(document.getElementById('tpl-slides').innerText);

    document.getElementById('slides').innerHTML = template({
      slides: milanSlides
    });
  });

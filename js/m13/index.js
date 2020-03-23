// у всех слайдов одинаковая высота
class Slider {
  constructor(el) {
    this.el_sliderWrap = el
    this.el_slider = this.el_sliderWrap.querySelector('[data-type="slider"]')
    this.slides = Array.from(el.querySelectorAll('li'))

    this.arrowBack = document.createElement('span');
    this.arrowBack.dataset.arrow = 'back';
    this.arrowForward = document.createElement('span')
    this.arrowForward.dataset.arrow = 'forward'
    this.HandlerCont = document.createElement('ul')
    this.HandlerCont.dataset.type = 'Handler-cont'

    this.config = {
      useMedia: true // использовать медиа запросы или оставить адаптивность по дефолту
    }

    this.globs = {
      maxSlide: 3, // максимальное разрешенное кол-во слайдов на экране
      start: 0, // позиция первого слайда
      length: null, // текущее кол-во слайдов на экране
      init: false, // если false - инициализация еще не происходила
      anim: false, // происходит ли анимация в данный момент
      Handlers: false// если false - использовать стрелочки, иначе хэндлеры
    }

    this.media = {
      mobile: null,
      tablet: window.matchMedia('(min-width: 801px) and (max-width: 1024px)'),
      desktop: window.matchMedia('(min-width: 1025px)')
    }

    // listeners
    this.el_slider.addEventListener('animationend', () => this.animationListener, false)
    this.arrowBack.addEventListener('click', () => this.goBack())
    this.arrowForward.addEventListener('click', () => this.goForward())

    this.init({ type: 'init' })
  }

  init(e) { // динамически присваивает параметры при ресайзе
    if (this.config.useMedia) {
      if (this.media.tablet.matches) this.globs.maxSlide = 2
      if (this.media.desktop.matches) this.globs.maxSlide = 3
    }

    const el_slide = this.slides[this.globs.start].querySelector('[data-type="slide"]')
    const slider_padding = +getComputedStyle(this.el_slider).paddingLeft.slice(0, -2) + +getComputedStyle(this.el_slider).paddingRight.slice(0, -2)
    const slider_width = this.el_slider.clientWidth
    const slid_width = +getComputedStyle(el_slide)['min-width'].slice(0, -2) || el_slide.offsetWidth
    this.length = Math.floor((slider_width - slider_padding) / slid_width) || 1// количество влезаемых по ширине слайдов
    this.length = (this.length > this.globs.maxSlide) ? this.globs.maxSlide : this.length
    this.globs.Handlers = !((this.length > 2))
    if (this.globs.length === null) this.globs.length = this.length// предыдущее значение влезаемых слайдов

    this.renderController(e)
  }

  renderController(e) {
    // console.log(e);
    if (!e) e = {}
    const resize = this.length - this.globs.length

    const setSlidesVisible = () => {
      this.slidesVisible = this.slides.slice(this.globs.start, this.globs.start + this.length)
      this.slideFirst = this.slidesVisible[0]
      this.slideLast = this.slidesVisible[this.slidesVisible.length - 1]
    }

    if (e.type === 'click') {
      // console.log( e.type);
      this.animHandler(`anim-${e.direction}-1`)
        .then((result) => {
          setSlidesVisible()
          this.showSlides();
          (this.globs.Handlers) ? this.createHandlers() : this.createArrow()
          this.globs.length = this.length
          this.globs.init = true
          this.animHandler(`anim-${e.direction}-2`)
        })
    } else if (e.type === 'resize' || e.type === 'init') {
      // console.log( e.type);
      if (resize !== 0 || e.type === 'init') { // если есть изменения в кол-ве влезаемых слайдов
        if (resize > 0 && (this.globs.start + this.length >= this.slides.length)) {
          // console.log('окно уменьшилось');
          const excess = this.globs.start + this.length - this.slides.length
          this.globs.start = this.globs.start - excess
        }

        setSlidesVisible();
        (this.globs.Handlers) ? this.createHandlers() : this.createArrow()
        this.showSlides()
        this.globs.length = this.length
        this.globs.init = true
      }
    } else {
      console.log('неведомая хрень приключилась...')
      // console.log(e);
    }
  }

  animHandler(anim, config = { type: null, direction: null }) {
    // return new Promise(function(resolve, reject){
    return new Promise((resolve) => {
      if (this.globs.anim) {
        this.el_slider.classList.forEach(i => {
          // console.log(i);
          if (i.startsWith('anim')) {
            this.el_slider.classList.remove(i)
          }
        })
      }

      this.el_slider.classList.add(anim)
      this.globs.anim = true
      this.el_slider.onanimationend = (e) => resolve(e)
    })
  }

  showSlides() { // инициализирует показ исходя из параметров init()
    for (const i of this.slides) {
      if (this.slidesVisible.indexOf(i) === -1) i.style.display = 'none'
      else { i.style.display = 'list-item' };

      if (this.globs.anim) {
        this.el_slider.classList.forEach(i => {
          // console.log(i);
          if (i.startsWith('anim')) {
            this.el_slider.classList.remove(i)
          }
        })
        this.globs.anim = false
      }
    }
    // console.log('end showSlides');
  }

  createArrow(el) {
    const getOffsetTop = (el) => {
      let offsetTopSum = 0
      if (el !== this.el_sliderWrap) {
        offsetTopSum += el.offsetTop + getOffsetTop(el.offsetParent)
      }
      return offsetTopSum
    }

    if (!el) {
      el = this.slides[0].querySelector('[data-type="image-cont"]')
    }

    this.HandlerCont.remove()
    if (this.arrowBack.style.top === '' || this.arrowForward.style.top === '') {
      const top = Math.floor(getOffsetTop(el) + el.offsetHeight / 2) + 'px'
      this.arrowBack.style.top = top
      this.arrowForward.style.top = top
    }

    if (this.slides.indexOf(this.slideFirst) !== 0) { // если есть куда мотать назад - показываем стрелочку
      this.el_sliderWrap.prepend(this.arrowBack)
    } else {
      this.arrowBack.remove()
    }
    if (this.slides.indexOf(this.slideLast) !== this.slides.length - 1) { // если есть куда мотать вперед - показываем стрелочку
      this.el_sliderWrap.prepend(this.arrowForward)
    } else {
      this.arrowForward.remove()
    }
    // console.log('end createArrow');
  }

  createHandlers() {
    this.arrowBack.remove()
    this.arrowForward.remove()
    this.HandlerCont.remove()
    this.HandlerCont.innerHTML = ''

    let currentHandler = false

    const selectHandler = (e) => {
      const el_current = e.currentTarget
      const el_last = this.HandlerCont.querySelector('[data-slider-selected]')
      if (el_current === el_last) return
      const nodes = Array.from(this.HandlerCont.childNodes)
      const indexCurrent = nodes.indexOf(el_current)
      const indexLast = nodes.indexOf(el_last)
      const anim = (indexCurrent > indexLast) ? 'forward' : 'back'

      el_last.removeAttribute('data-slider-selected')
      this.globs.start = indexCurrent
      el_current.dataset.sliderSelected = true
      this.renderController({ type: 'click', direction: anim })
    }

    for (const i of this.slides) {
      if (this.slidesVisible.indexOf(i) !== -1) {
        if (currentHandler) continue
        const el_Handler = document.createElement('li')
        el_Handler.addEventListener('click', selectHandler)
        el_Handler.dataset.sliderSelected = true
        this.HandlerCont.append(el_Handler)
        currentHandler = true
      } else {
        const el_Handler = document.createElement('li')
        el_Handler.addEventListener('click', selectHandler)
        this.HandlerCont.append(el_Handler)
      }
    }
    this.el_sliderWrap.append(this.HandlerCont)
  }

  goForward() {
    if (this.slides.indexOf(this.slideLast) !== this.slides[this.slides.length - 1]) {
      this.globs.start += 1
      this.renderController({ type: 'click', direction: 'forward' })
    }
  }

  goBack() {
    if (this.slides.indexOf(this.slideFirst) !== this.slides[0]) {
      this.globs.start -= 1
      this.renderController({ type: 'click', direction: 'back' })
    }
  }
}

function setEventDelay(e, f, ms) { // задержка для функции
  let timer
  return function(e) {
    if (!timer) {
      timer = setTimeout(
        function() {
          clearTimeout(timer)
          timer = null
          f(e)
        },
        ms,
        e
      )
    }
  }
}

function init() {
  const el_slider = document.querySelector('[data-type="slider-wrap"]')

  const slider = new Slider(el_slider)
  const resizeInit = setEventDelay(null, slider.init.bind(slider), 500)// замыкание метода с таймером

  window.addEventListener('resize', (e) => resizeInit(e), false)
}

document.addEventListener('DOMContentLoaded', init)
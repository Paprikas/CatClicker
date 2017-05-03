var catsData = [
  {
    id: 1,
    name: 'Martha',
    image: 'martha.jpg',
    clicks: 0
  },
  {
    id: 2,
    name: 'Anna',
    image: 'anna.jpg',
    clicks: 0
  },
  {
    id: 3,
    name: 'Hat cat',
    image: 'hat_cat.jpg',
    clicks: 0
  },
  {
    id: 4,
    name: 'Mother',
    image: 'mother_cat.jpg',
    clicks: 0
  },
  {
    id: 5,
    name: 'Boss',
    image: 'boss.jpg',
    clicks: 0
  }
]

var model = {
  cats: [],
  init: function () {
    for (var i = 0; i < catsData.length; i++) {
      var cat = catsData[i]
      this.cats.push(new Cat(cat.id, cat.name, cat.image, cat.clicks))
    }
  }
}

var controller = {
  init: function () {
    model.init()
    view.init()
  },
  getCats: function () {
    return model.cats
  },
  incrementClicks: function () {
    model.currentCat.clicks++
    view.renderToMain(model.currentCat)
  },
  setCurrentCat: function (cat) {
    model.currentCat = cat
  },
  getCurrentCat: function () {
    return model.currentCat
  }
}

var view = {
  init: function () {
    this.catClicks = document.getElementById('main-cat-clicks')
    this.catName = document.getElementById('main-cat-name')
    this.catImage = document.getElementById('main-cat-image')
    this.catImage.addEventListener('click', function () {
      controller.incrementClicks()
    })

    this.renderList()
  },
  renderList: function () {
    for (var i = 0; i < controller.getCats().length; i++) {
      var cat = controller.getCats()[i]

      var paragraph = document.createElement('P')
      paragraph.innerText = cat.name

      paragraph.addEventListener('click', (
        function (cat) {
          return function () {
            controller.setCurrentCat(cat)
            view.renderToMain()
          }
        }
      )(cat))

      document.body.appendChild(paragraph)
    }
  },
  renderToMain: function () {
    var cat = controller.getCurrentCat()
    this.catClicks.innerText = cat.clicks
    this.catName.innerText = cat.name
    this.catImage.setAttribute('src', './assets/images/' + cat.image)
  }
}

function Cat (id, name, image, clicks) {
  this.id = id
  this.name = name
  this.image = image
  this.clicks = clicks
}

controller.init()

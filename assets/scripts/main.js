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
  incrementCat: function (cat) {
    cat.clicks++
    view.renderToMain(cat)
  }
}

var view = {
  init: function () {
    var mainCatContainer = document.createElement('DIV')
    mainCatContainer.setAttribute('id', 'main-cat-container')
    document.body.appendChild(mainCatContainer)

    this.renderList()
  },
  renderList: function () {
    for (var i = 0; i < controller.getCats().length; i++) {
      var cat = controller.getCats()[i]

      var paragraph = document.createElement('P')
      paragraph.innerText = cat.name

      paragraph.addEventListener('click', (
        function (cat) {
          return function () { view.renderToMain(cat) }
        }
      )(cat))

      document.body.appendChild(paragraph)
    }
  },
  renderToMain: function (cat) {
    var divContainer = document.createElement('DIV')
    divContainer.setAttribute('class', 'cat-container')

    var h1Counter = document.createElement('H1')
    h1Counter.setAttribute('id', cat.id)
    h1Counter.innerText = cat.clicks

    var divCatName = document.createElement('DIV')
    divCatName.innerText = cat.name

    var imgCat = document.createElement('IMG')
    imgCat.setAttribute('src', './assets/images/' + cat.image)

    divContainer.appendChild(h1Counter)
    divContainer.appendChild(divCatName)
    divContainer.appendChild(imgCat)

    var mainCatContainer = document.getElementById('main-cat-container')

    if (mainCatContainer.childNodes[0] === undefined) {
      mainCatContainer.appendChild(divContainer)
    } else {
      mainCatContainer.replaceChild(divContainer, mainCatContainer.childNodes[0])
    }

    imgCat.addEventListener('click', function () {
      controller.incrementCat(cat)
    })
  }
}

function Cat (id, name, image, clicks) {
  this.id = id
  this.name = name
  this.image = image
  this.clicks = clicks
}

controller.init()

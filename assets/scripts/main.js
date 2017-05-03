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
    adminView.init()
    catView.init()
    catListView.render()
  },
  getCats: function () {
    return model.cats
  },
  incrementClicks: function () {
    model.currentCat.clicks++
    catView.render(model.currentCat)
  },
  setCurrentCat: function (cat) {
    model.currentCat = cat
  },
  getCurrentCat: function () {
    return model.currentCat
  },
  updateCurrentCat: function () {
    model.currentCat.name = adminView.name.value
    model.currentCat.image = adminView.image.value
    model.currentCat.clicks = adminView.clicks.value
    catView.render(model.currentCat)
    adminView.hide()
  }
}

var catView = {
  init: function () {
    this.catClicks = document.getElementById('cat-clicks')
    this.catName = document.getElementById('cat-name')
    this.catImage = document.getElementById('cat-image')
    this.adminButton = document.getElementById('show-admin')
    this.catImage.addEventListener('click', function () {
      controller.incrementClicks()
    })
    this.adminButton.addEventListener('click', function () {
      adminView.render()
    })
  },
  render: function () {
    var cat = controller.getCurrentCat()
    var catContainer = document.getElementById('cat')
    catContainer.removeAttribute('class')
    this.catClicks.innerText = cat.clicks
    this.catName.innerText = cat.name
    this.catImage.setAttribute('src', './assets/images/' + cat.image)
  }
}

var catListView = {
  render: function () {
    var catsContainer = document.getElementById('cats-list')

    for (var i = 0; i < controller.getCats().length; i++) {
      var cat = controller.getCats()[i]

      var paragraph = document.createElement('P')
      paragraph.innerText = cat.name

      paragraph.addEventListener('click', (
        function (cat) {
          return function () {
            controller.setCurrentCat(cat)
            catView.render()
            adminView.hide()
          }
        }
      )(cat))

      catsContainer.appendChild(paragraph)
    }
  }
}

var adminView = {
  init: function () {
    this.adminContainer = document.getElementById('admin-container')
    this.name = document.getElementById('a-name')
    this.image = document.getElementById('a-image')
    this.clicks = document.getElementById('a-clicks')
    this.cancelButton = document.getElementById('cancel-button')
    this.updateButton = document.getElementById('update-button')

    this.cancelButton.addEventListener('click', function () {
      adminView.hide()
    })
    this.updateButton.addEventListener('click', function () {
      controller.updateCurrentCat()
    })
  },
  render: function () {
    var cat = controller.getCurrentCat()
    this.show()
    this.name.value = cat.name
    this.image.value = cat.image
    this.clicks.value = cat.clicks
  },
  hide: function () {
    this.adminContainer.setAttribute('class', 'hidden')
  },
  show: function () {
    this.adminContainer.removeAttribute('class')
  }
}

function Cat (id, name, image, clicks) {
  this.id = id
  this.name = name
  this.image = image
  this.clicks = clicks
}

controller.init()

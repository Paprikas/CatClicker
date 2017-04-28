var mainCatContainer = document.createElement('DIV')
mainCatContainer.setAttribute('class', 'main-cat-container')
document.body.appendChild(mainCatContainer)

var catsContainer = document.createElement('DIV')
catsContainer.setAttribute('class', 'cats-container')
document.body.appendChild(catsContainer)

function Cat (name, image) {
  this.name = name
  this.image = image
}

Cat.prototype = {
  clicked: function () {
    var counter = document.getElementById(this.id)
    this.click_count++
    counter.innerText = this.click_count
  },
  renderToList: function (id) {
    var self = this // Find best practice
    this.id = 'cat_' + id
    this.click_count = 0

    var paragraph = document.createElement('P')
    paragraph.innerText = this.name

    paragraph.addEventListener('click', function () {
      self.renderToMain()
    })

    document.body.appendChild(paragraph)
  },
  renderToMain: function () {
    var self = this // Find best practice

    var divContainer = document.createElement('DIV')
    divContainer.setAttribute('class', 'cat-container')

    var h1Counter = document.createElement('H1')
    h1Counter.setAttribute('id', this.id)
    h1Counter.innerText = this.click_count

    var divCatName = document.createElement('DIV')
    divCatName.innerText = this.name

    var imgCat = document.createElement('IMG')
    imgCat.setAttribute('src', this.image)

    divContainer.appendChild(h1Counter)
    divContainer.appendChild(divCatName)
    divContainer.appendChild(imgCat)

    if (mainCatContainer.childNodes[0] === undefined) {
      mainCatContainer.appendChild(divContainer)
    } else {
      mainCatContainer.replaceChild(divContainer, mainCatContainer.childNodes[0])
    }

    imgCat.addEventListener('click', function () {
      self.clicked()
    })
  }
}

var cats = [
  new Cat('Martha', './assets/images/martha.jpg'),
  new Cat('Boss', './assets/images/boss.jpg'),
  new Cat('Anna', './assets/images/anna.jpg'),
  new Cat('Hat Cat', './assets/images/hat_cat.jpg'),
  new Cat('Mother Cat', './assets/images/mother_cat.jpg')
]

for (var index in cats) {
  cats[index].renderToList(index)
}

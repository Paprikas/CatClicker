var main_cat_container = document.createElement("DIV");
var main_cat_container_class = document.createAttribute("class");
main_cat_container_class.value = "main-cat-container";
main_cat_container.setAttributeNode(main_cat_container_class);
document.body.appendChild(main_cat_container);

var cats_container = document.createElement("DIV");
var cats_container_class = document.createAttribute("class");
cats_container_class.value = "cats-container";
cats_container.setAttributeNode(cats_container_class);
document.body.appendChild(cats_container);

function Cat(name, image) {
  this.name = name;
  this.image = image;
}

Cat.prototype = {
  clicked: function() {
    counter = document.getElementById(this.id);
    this.click_count++;
    counter.innerText = this.click_count;
  },
  renderToList: function(id) {
    var self = this; // Find best practice
    this.id = "cat_" + id;
    this.click_count = 0;

    var paragraph = document.createElement("P");
    paragraph.innerText = this.name;

    paragraph.addEventListener("click", function() {
      self.renderToMain();
    });

    document.body.appendChild(paragraph);
  },
  renderToMain: function() {
    var self = this; // Find best practice

    var div_container = document.createElement("DIV");
    div_container.setAttribute("class", "cat-container");

    var h1_counter = document.createElement("H1");
    h1_counter.setAttribute("id", this.id);
    h1_counter.innerText = this.click_count;

    var div_cat_name = document.createElement("DIV");
    div_cat_name.innerText = this.name;

    var img_cat = document.createElement("IMG");
    img_cat.setAttribute("src", this.image);

    div_container.appendChild(h1_counter);
    div_container.appendChild(div_cat_name);
    div_container.appendChild(img_cat);

    if (main_cat_container.childNodes[0] === undefined) {
      main_cat_container.appendChild(div_container);
    } else {
      main_cat_container.replaceChild(div_container, main_cat_container.childNodes[0]);
    }

    img_cat.addEventListener("click", function() {
      self.clicked();
    });
  }
};

var cats = [
  new Cat("Martha", "./assets/images/martha.jpg"),
  new Cat("Boss", "./assets/images/boss.jpg"),
  new Cat("Anna", "./assets/images/anna.jpg"),
  new Cat("Hat Cat", "./assets/images/hat_cat.jpg"),
  new Cat("Mother Cat", "./assets/images/mother_cat.jpg"),
];

for (var index in cats) {
  cats[index].renderToList(index);
}

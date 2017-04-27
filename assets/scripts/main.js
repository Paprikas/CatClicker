function Cat(name, image) {
  this.name = name;
  this.image = image;
}

Cat.prototype.clicked = function() {
  counter = document.getElementById(this.id);
  this.click_count++;
  counter.innerText = this.click_count;
};

Cat.prototype.render = function(id) {
  this.id = "cat_" + id;
  this.click_count = 0;

  var div_container = document.createElement("DIV");
  var h1_counter = document.createElement("H1");
  var counter_id = document.createAttribute("id");
  counter_id.value = this.id;
  h1_counter.setAttributeNode(counter_id);

  var div_name = document.createElement("DIV");
  div_name.innerText = this.name;

  var cat_image = document.createElement("IMG");
  var image_attr_src = document.createAttribute("src");
  image_attr_src.value = this.image;
  cat_image.setAttributeNode(image_attr_src);

  var image_class_src = document.createAttribute("class");
  image_class_src.value = "cat";
  cat_image.setAttributeNode(image_class_src);

  div_container.appendChild(h1_counter);
  div_container.appendChild(div_name);
  div_container.appendChild(cat_image);

  document.body.appendChild(div_container);

  var self = this; // Find best practice

  cat_image.addEventListener("click", function() {
    self.clicked();
  });
};

var cats = [
  new Cat("Martha", "./assets/images/martha.jpg"),
  new Cat("Boss", "./assets/images/boss.jpg")
];

for (var index in cats) {
  cats[index].render(index);
}

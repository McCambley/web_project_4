// Initial images object
const initialCards = [
  {
    name: "Georgia",
    link: "./images/franklin.jpeg",
  },
  {
    name: "Pisgah National Forest",
    link: "./images/pisgah.jpeg",
  },
  {
    name: "Dragon's Tooth",
    link: "./images/dragons-tooth.jpeg",
  },
  {
    name: "Pennsylvania",
    link: "./images/penn2.jpeg",
  },
  {
    name: "Stratton Pond",
    link: "./images/stratton.jpeg",
  },
  {
    name: "Franconia Ridge",
    link: "./images/franconia-ridge.jpeg",
  },
];

export default class Card {
  // takes card data - text and a link to the image - and a template element selector as parameters into the constructor
  constructor(card, templateSelector) {
    this._name = card.name;
    this._link = card.link;
  }

  testInstance() {
    console.log("Card exists");
  }

  // private methods for working with markup and adding event handlers

  // private methods for each event handler

  // one public method that returns a full functional card element populated with data
}

// create a card instance for each card

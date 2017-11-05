(function() {

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      * {
        box-sizing: border-box;
      }

      .card {
        position: relative;
        margin: 5px;
        padding: 5px;
        display: inline-block;
        background: white;
        width: 100px;
        height: 150px;
        border-radius: 5px;
        border: 1px solid #CCC;
        box-shadow: 0px 0px 10px 4px #CCC;
        cursor: pointer;
        transition: all 500ms linear;
      }

      .flip {
        transform: rotateY(180deg);
      }

      .back {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 5px;
        background: linear-gradient(to bottom, #69009e, gold);
        transition: all 1ms linear 250ms;
        opacity: 0;
      }

      .flip .back {
        opacity: 1;
      }

      .suit {
        line-height: 1em;
        text-align: center;
        font-weight: bold;
        width: 1em;
      }

      .suit.suit-top {
        position: absolute;
        top: 5px;
        left: 5px
      }

      .suit.suit-bottom {
        position: absolute;
        bottom: 5px;
        right: 5px
      }

      .suit.suit-large {
        position: absolute;
        margin-top: -20px;
        margin-left: -20px;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 40px;
      }
    </style>
    <div class="card">
      <div class="suit suit-top"></div>
      <div class="suit suit-large"></div>
      <div class="suit suit-bottom"></div>
      <div class="back"></div>
    </div>
  `;

  class Card extends HTMLElement {
    constructor(rank, suit) {
      super();
      this.attachShadow({
        mode: 'open'
      });
      var rank = rank ? rank : this.attributes['data-rank'].value;
      var suit = suit ? suit : this.attributes['data-suit'].value
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelectorAll('.suit').forEach(element => {
        element.innerHTML = rank + " " + suit;
      });
      this.shadowRoot.querySelector('.suit-large').innerHTML = suit;
      var color = 'black';
      switch (suit) {
        case '♦':
        case '♥':
          color = 'red';
          break;
      }
      this.style['color'] = color;
      this.addEventListener('click', this.toggle);
    }

    toggle() {
      console.log('toggle');
      this.shadowRoot.querySelector('.card').classList.toggle('flip');
    }

  }

  customElements.define('app-card', Card);

  var suits = ['♠', '♦', '♣', '♥'];
  var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var container = document.querySelector('.card-container');
  suits.forEach(suit => {
    ranks.forEach(rank => {
      document.body.appendChild(new Card(rank, suit));
    });
  });
})();

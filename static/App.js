"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var GameRow = function (_React$Component) {
  _inherits(GameRow, _React$Component);

  function GameRow() {
    _classCallCheck(this, GameRow);

    return _possibleConstructorReturn(this, (GameRow.__proto__ || Object.getPrototypeOf(GameRow)).apply(this, arguments));
  }

  _createClass(GameRow, [{
    key: "render",
    value: function render() {
      var game = this.props.game;
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          game.id
        ),
        React.createElement(
          "td",
          null,
          game.name
        ),
        React.createElement(
          "td",
          null,
          game.rating
        ),
        React.createElement(
          "td",
          null,
          game.plays
        )
      );
    }
  }]);

  return GameRow;
}(React.Component);

var GameTable = function (_React$Component2) {
  _inherits(GameTable, _React$Component2);

  function GameTable(props) {
    _classCallCheck(this, GameTable);

    var _this2 = _possibleConstructorReturn(this, (GameTable.__proto__ || Object.getPrototypeOf(GameTable)).call(this, props));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(GameTable, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.gameAdd;
      this.props.addGame({
        name: form.name.value,
        rating: form.rating.value
      });
      // clear the form for the next input
      form.name.value = "";
      form.rating.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      var gameRows = this.props.games.map(function (game) {
        return React.createElement(GameRow, { key: game.id, game: game });
      });
      return React.createElement(
        "form",
        { name: "gameAdd", onSubmit: this.handleSubmit },
        React.createElement(
          "table",
          { className: "bordered-table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "Id"
              ),
              React.createElement(
                "th",
                null,
                "Name"
              ),
              React.createElement(
                "th",
                null,
                "Rating"
              ),
              React.createElement(
                "th",
                null,
                "Plays"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            React.createElement(GameAddFields, null),
            gameRows
          )
        )
      );
    }
  }]);

  return GameTable;
}(React.Component);

function GameAddFields() {
  return React.createElement(
    "tr",
    null,
    React.createElement("td", null),
    React.createElement(
      "td",
      null,
      React.createElement("input", { type: "text", name: "name", placeholder: "name" })
    ),
    React.createElement(
      "td",
      null,
      React.createElement("input", { size: 1, name: "rating" })
    ),
    React.createElement(
      "td",
      null,
      React.createElement(
        "button",
        { type: "submit" },
        "Add"
      )
    )
  );
}

var games = [{
  id: 1, name: 'Checkers', rating: 0, plays: 10
}, {
  id: 2, name: 'Chess', rating: 1, plays: 5
}];

var GameList = function (_React$Component3) {
  _inherits(GameList, _React$Component3);

  function GameList() {
    _classCallCheck(this, GameList);

    var _this3 = _possibleConstructorReturn(this, (GameList.__proto__ || Object.getPrototypeOf(GameList)).call(this));

    _this3.state = { games: [] };

    _this3.addGame = _this3.addGame.bind(_this3);
    return _this3;
  }

  _createClass(GameList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this4 = this;

      setTimeout(function () {
        _this4.setState({ games: games });
      }, 500);
    }
  }, {
    key: "addGame",
    value: function addGame(newGame) {
      var newGames = this.state.games.slice();
      newGame.id = this.state.games.length + 1;
      newGames.push(newGame);
      this.setState({ games: newGames });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Simple Pancake"
        ),
        React.createElement("hr", null),
        React.createElement(GameTable, { games: this.state.games, addGame: this.addGame }),
        React.createElement("hr", null)
      );
    }
  }]);

  return GameList;
}(React.Component);

ReactDOM.render(React.createElement(GameList, null), contentNode); // Render the component inside the content Node
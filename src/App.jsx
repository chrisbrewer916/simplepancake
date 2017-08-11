const contentNode = document.getElementById('contents');

class GameRow extends React.Component {

  render () {
    const game = this.props.game;
    return (
      <tr>
        <td>{game.id}</td>
        <td>{game.name}</td>
        <td>{game.rating}</td>
        <td>{game.plays}</td>
      </tr>
    )
  }

}

class GameTable extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.gameAdd;
    this.props.addGame({
      name: form.name.value,
      rating: form.rating.value,
    });
    // clear the form for the next input
    form.name.value = "";
    form.rating.value = "";
  }

  render() {
    const gameRows = this.props.games.map(game => <GameRow key={game.id} game={game} />)
    return (
      <form name="gameAdd" onSubmit={this.handleSubmit}>
        <table className="bordered-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Plays</th>
            </tr>
          </thead>
          <tbody>
            <GameAddFields />
            {gameRows}
          </tbody>
        </table>
      </form>
    )
  }

}

function GameAddFields() {
    return (
    <tr>
      <td></td>
      <td>
        <input type="text" name="name" placeholder="name" />
      </td>
      <td>
        <input size={1} name="rating" />
      </td>
      <td>
        <button type="submit">Add</button>
      </td>
    </tr>
  );
}


const games = [
  {
    id: 1, name: 'Checkers', rating: 0, plays: 10,
  },
  {
    id: 2, name: 'Chess', rating: 1, plays: 5,
  },
];

class GameList extends React.Component {

  constructor() {
    super();
    this.state = { games: [] };

    this.addGame = this.addGame.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ games: games });
    }, 500);
  }

  addGame(newGame) {
    const newGames = this.state.games.slice();
    newGame.id = this.state.games.length + 1;
    newGames.push(newGame);
    this.setState({ games: newGames });
  }

  render() {
    return (
      <div>
        <h1>Simple Pancake</h1>
        <hr />
        <GameTable games={this.state.games} addGame={this.addGame}/>
        <hr />
      </div>
    );
  }
}

ReactDOM.render(<GameList />, contentNode);      // Render the component inside the content Node

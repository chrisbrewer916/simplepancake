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
    fetch('/api/games').then(response => response.json()
    ).then(data => {
      console.log("Total count of records: ", data._metadata.total_count);
      this.setState({ games: data.records });
    }).catch(err => {
      console.log(err);
    });
  }

  addGame(newGame) {
    fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame),
    }).then(response => response.json()
    ).then(updatedGame => {
      const newGames = this.state.games.concat(updatedGame);
      this.setState({ games: newGames });
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
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

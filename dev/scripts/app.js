//create a form so it can save info on firebase
//get request of list
//render list with react
//creating admin login and regular user login
//if not admin, access read only
//add favourite button under a user 
//tattoo list - users{ [tattoo place ids] }


import React from "react";
import ReactDOM from "react-dom";
import {ajax} from "jquery";

var config = {
	apiKey: "AIzaSyBfyHzA5qH8QsKYBdLPjg-L5kcP1EtwHX8",
	authDomain: "event-app-5104b.firebaseapp.com",
	databaseURL: "https://event-app-5104b.firebaseio.com/",
	projectId: "event-app-5104b",
	storageBucket: "event-app-5104b.appspot.com",
	messagingSenderId: "730097503193"
};
firebase.initializeApp(config);
const auth = firebase.auth();
//giving us access to google auth
const provider = new firebase.auth.GoogleAuthProvider();

//referencing the database in the root folder
const dbRef = firebase.database().ref("/tattooPlaces");
// const dbUserRef = firebase.database().ref("/users");

//main app
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			instagram: "",
			shop: "",
			neighbourhood: "",
			blackwork: false,
			dotworkorsingleneedle: false,
			geometric: false,
			handpoke: false,
			ignorant: false,
			japanese: false,
			linework: false,
			neotraditional: false,
			newschool: false,
			realism: false,
			script: false,
			traditional: false,
			tribal: false,
			watercolour: false,
			artists: [],
			filters: []
		}
		//binding methods to main constructor
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleFilter = this.toggleFilter.bind(this)
	}
	handleChange(e) {
		if  (e.target.name == "style" && this.state.style != "") {
			var style =	e.target.getAttribute("id")
			var newStyleState = !this.state[style]
			this.setState({
				[style]: newStyleState
		}); 
		}
		else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		//grabbing value from input
		const name = this.state.name
		const instagram = this.state.instagram
		const shop = this.state.shop
		const neighbourhood = this.state.neighbourhood
		const style = this.state.style

		//pushing into original state
		dbRef.push({
			name: name,
			instagram: instagram,
			shop: shop,
			blackwork: this.state.blackwork,
			dotworkorsingleneedle: this.state.dotworkorsingleneedle,
			geometric: this.state.geometric,
			handpoke: this.state.handpoke,
			ignorant: this.state.ignorant,
			japanese: this.state.japanese,
			linework: this.state.linework,
			neotraditional: this.state.neotraditional,
			newschool: this.state.newschool,
			realism: this.state.realism,
			script: this.state.script,
			traditional: this.state.traditional,
			tribal: this.state.tribal,
			watercolour: this.state.watercolour
		})

		this.setState({
			name: name,
			instagram: instagram,
			shop: shop,
			neighbourhood: neighbourhood,
			style: style
		})
	}

	toggleFilter(e) {
		var style = e.target.value;
		var currentState = this.state;
		console.log(currentState);
		var index = currentState.filters.indexOf(style);
		console.log(style);
		// this is where we'll update state when we check/uncheck in the StyleChecklist component
		// if style doesn't already exist in filter array, then push
		if (index === -1 ) {
			console.log('Cant find style, add to array:', style);
			currentState.filters.push(style);
		} else {
			// if it does, then remove
			currentState.filters.splice(index, 1);
		}
		this.setState(currentState);
	}

	render() {
		return (
			<div className="wrapper">
				
				
					<section className="title">
						<h1>inkedin</h1>
						<h3>submit and find tattoo artists in the city</h3>
					</section>

					<h2>submit an artist</h2>
					<form onSubmit={this.handleSubmit}>
						<section className="textForm">
							<input name="name" type="text" placeholder="artist name" onChange={this.handleChange}/>
							<input name="instagram" type="text" placeholder="instagram" onChange={this.handleChange}/>
							<input name="shop" type="text" placeholder="shop" onChange={this.handleChange}/>
							<input name="neighbourhood" type="text" placeholder="neighbourhood" onChange={this.handleChange}/>
						</section>

						<h3>select their style(s)</h3>
						<section className="checkboxForm">

							<div className="labelForm">
								<input type="checkbox" id="blackwork" name="style" value={this.state.blackwork} onChange={this.handleChange}/>
								<label htmlFor="blackwork">Blackwork</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="dotworkorsingleneedle" name="style" value={this.state.dotworkorsingleneedle} onChange={this.handleChange}/>
								<label htmlFor="dotworkorsingleneedle">Dotwork or Single Needle</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="geometric" name="style" value={this.state.geometric} onChange={this.handleChange}/>
								<label htmlFor="geometric">Geometric</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="handpoke" name="style" value={this.state.handpoke} onChange={this.handleChange}/>
								<label htmlFor="handpoke">Handpoke</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="ignorant" name="style" value={this.state.ignorant} onChange={this.handleChange}/>
								<label htmlFor="ignorant">Ignorant</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="japanese" name="style" value={this.state.japanese} onChange={this.handleChange}/>
								<label htmlFor="japanese">Japanese</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="linework" name="style" value={this.state.linework} onChange={this.handleChange}/>
								<label htmlFor="linework">Linework</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="neotraditional" name="style" value={this.state.neotraditional} onChange={this.handleChange}/>
								<label htmlFor="neotraditional">Neo-Traditional</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="newschool" name="style" value={this.state.newschool} onChange={this.handleChange}/>
								<label htmlFor="newschool">New-School</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="realism" name="style" value={this.state.realism} onChange={this.handleChange}/>
								<label htmlFor="realism">Realism</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="script" name="style" value={this.state.script} onChange={this.handleChange}/>
								<label htmlFor="script">Script</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="traditional" name="style" value={this.state.traditional} onChange={this.handleChange}/>
								<label htmlFor="traditional">Traditional</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="tribal" name="style" value={this.state.tribal} onChange={this.handleChange}/>
								<label htmlFor="tribal">Tribal</label>
							</div>

							<div className="labelForm">
								<input type="checkbox" id="watercolour" name="style" value={this.state.watercolour} onChange={this.handleChange}/>
								<label htmlFor="watercolour">Watercolour</label>
							</div>

						</section>
							<input type="submit" value="submit artist"/>
					</form>
				
					<StyleChecklist toggleFilter={this.toggleFilter} />
					<FilteredList artists={this.state.artists} filters={this.state.filters} />
					<ArtistsList artists={this.state.artists} />
				</div>
		)
	}
	componentDidMount(){
		dbRef.on("value", (snapshot) => {
			const data = snapshot.val();
			const artists = [];
			for(let key in data) {
				artists.push(data[key]);
			}
			this.setState({ artists: artists });
		});
	}
}

class StyleChecklist extends React.Component {
	render() {
		return (
			<div>
				<h2>my style checklist</h2>
				<section className="filterMyList">
		
						<input type="checkbox" name="style" value="blackwork" onChange={this.props.toggleFilter} />
						<label>Blackwork</label>
					
						<input type="checkbox" name="style" value="dotworkorsingleneedle" onChange={this.props.toggleFilter}/>
						<label>Dotwork or Single Needle</label>
				
						<input type="checkbox" name="style" value="geometric" onChange={this.props.toggleFilter}/>
						<label>Geometric</label>
					
						<input type="checkbox" name="style" value="handpoke" onChange={this.props.toggleFilter} />
						<label>Handpoke</label>
				
						<input type="checkbox" name="style" value="ignorant" onChange={this.props.toggleFilter}/>
						<label>Ignorant</label>
				
						<input type="checkbox" name="style" value="japanese" onChange={this.props.toggleFilter}/>
						<label>Japanese</label>
					
						<input type="checkbox" name="style" value="linework" onChange={this.props.toggleFilter} />
						<label>Linework</label>
					
						<input type="checkbox" name="style" value="neotraditional" onChange={this.props.toggleFilter}/>
						<label>Neo-Traditional</label>
					
						<input type="checkbox" name="style" value="newschool" onChange={this.props.toggleFilter}/>
						<label>New-School</label>
					
						<input type="checkbox" name="style" value="realism" onChange={this.props.toggleFilter} />
						<label>Realism</label>
					
						<input type="checkbox" name="style" value="script" onChange={this.props.toggleFilter}/>
						<label>Script</label>
					
						<input type="checkbox" name="style" value="traditional" onChange={this.props.toggleFilter}/>
						<label>Traditional</label>
					
						<input type="checkbox" name="style" value="tribal" onChange={this.props.toggleFilter} />
						<label>Tribal</label>
					
						<input type="checkbox" name="style" value="watercolour" onChange={this.props.toggleFilter}/>
						<label>Watercolour</label>
					
				</section>
			</div>
		)
	}
}

//displaying first component of artist listings
class ArtistsList extends React.Component {
	render() {
		console.log(this.props.artists)
		console.log(Array.isArray(this.props.artists))
		return (
			<ul className="artistInfo">
				{
					this.props.artists.map((artist, index) => { 
						return (
							<ArtistListItem artist={artist} key={index}/>
						)
					})
				}
			</ul>
		)
	}
}

class ArtistListItem extends React.Component {
	render () {
		return (
			<li>
				<p><span>Name</span> {this.props.artist.name}</p>
				<p><span>Instagram</span> {this.props.artist.instagram}</p>
				<p><span>Shop</span> {this.props.artist.shop}</p>
				<p><span>Style</span>
					{ this.props.artist.blackwork === true ? " Blackwork" : null }
					{ this.props.artist.dotworkorsingleneedle === true ? " Dot Work or Single Needle" : null }
					{ this.props.artist.geometric === true ? " Geometric" : null }
					{ this.props.artist.handpoke === true ? " Handpoke" : null }
					{ this.props.artist.ignorant === true ? " Ignorant" : null }
					{ this.props.artist.japanese === true ? " Japanese" : null }
					{ this.props.artist.linework === true ? " Linework" : null }
					{ this.props.artist.neotraditional === true ? " Neo-Traditional" : null }
					{ this.props.artist.newschool === true ? " New-School" : null }
					{ this.props.artist.realism === true ? " Realism" : null }
					{ this.props.artist.script === true ? " Script" : null }
					{ this.props.artist.traditional === true ? " Traditional" : null }
					{ this.props.artist.tribal === true ? " Tribal" : null }
					{ this.props.artist.watercolour === true ? " Watercolour" : null }
				</p>
			</li>
		)
	}
}

// filtered list component
class FilteredList extends React.Component {
	render() {
		// filteredList is a variable that will store an ARRAY of all the ARTISTS with the matching STYLES
		// filter through artists (master list)
		const filteredList = this.props.artists.filter(artist => {
			// isMatched is either true or false
			var isMatched;
			// loop through each of the STYLES in the FILTERED ARRAY
			// ["Blackwork","Ignorant", "Handpoke", "Linework"]
			this.props.filters.forEach(filteredStyle => {
				// if the artist has matching style
				if (artist[filteredStyle]) {
				// set isMatched to true
					isMatched = true;
				};
			})
			// if there is a match, then add artist to filteredList array
			return isMatched;
		})

		return (
			<div>
				<h2>my filtered list</h2>
				<ul className="artistInfoFiltered">
					{ filteredList.map((artist, index) => <ArtistListItem key={index} artist={artist} />) }
				</ul>
			</div>
		)
	}
}


ReactDOM.render(<App/>, document.getElementById("app"));
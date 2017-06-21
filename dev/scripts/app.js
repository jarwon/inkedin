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
//const dbUserRef = firebase.database().ref("/users");

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
			filters: [],
			submitted: false
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
			style: style,
			submitted: !this.state.submitted
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
			console.log("Cant find style, add to array:", style);
			currentState.filters.push(style);
		} else {
			// if it does, then remove
			currentState.filters.splice(index, 1);
		}
		this.setState(currentState);
	}


	render() {
		let submit;
		if (this.state.submitted) {
			submit = (
				<div>
					<input type="submit" value="submit artist"/>
					<p> Thank you for submitting! </p>
				</div>
			)
		} else {
			submit = (
				<div>
					<input type="submit" value="submit artist"/>
				</div>			
			)
		}

		return (
			<div className="wrapper">
				<div id="fullpage">

					<div className="section title">
						<h1>inkedin</h1>
						<p><a href="#secondPage">submit an artist</a></p>
						<p><a href="#thirdPage">find an artist</a></p>

						<i className="fa fa-arrow-circle-down fa-3x"></i>
					</div>

					<div className="section form">
						<form onSubmit={this.handleSubmit}>
							<div className="form-instructions">
								<h2>submit an artist</h2>
							</div>
							<section className="form-container">
								<section className="form-text">
									<input name="name" type="text" placeholder="artist name" onChange={this.handleChange}/>
									<input name="instagram" type="text" placeholder="instagram" onChange={this.handleChange}/>
									<input name="shop" type="text" placeholder="shop" onChange={this.handleChange}/>
									<input name="neighbourhood" type="text" placeholder="neighbourhood" onChange={this.handleChange}/>
								</section>
								<h3 className="form-container--media">select their style(s)</h3>
								<section className="form-checklist">
									<h3>select their style(s)</h3>
	
								<section className="form-checklist--container">
									<section className="form-checklist--checkbox">

										<div className="form-checklist--label">
											<input type="checkbox" id="blackwork" name="style" value={this.state.blackwork} onChange={this.handleChange}/>
											<label htmlFor="blackwork">Blackwork</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="dotworkorsingleneedle" name="style" value={this.state.dotworkorsingleneedle} onChange={this.handleChange}/>
											<label htmlFor="dotworkorsingleneedle">Dotwork or Single Needle</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="geometric" name="style" value={this.state.geometric} onChange={this.handleChange}/>
											<label htmlFor="geometric">Geometric</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="handpoke" name="style" value={this.state.handpoke} onChange={this.handleChange}/>
											<label htmlFor="handpoke">Handpoke</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="ignorant" name="style" value={this.state.ignorant} onChange={this.handleChange}/>
											<label htmlFor="ignorant">Ignorant</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="japanese" name="style" value={this.state.japanese} onChange={this.handleChange}/>
											<label htmlFor="japanese">Japanese</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="linework" name="style" value={this.state.linework} onChange={this.handleChange}/>
											<label htmlFor="linework">Linework</label>
										</div>
									</section>
									<section className="form-checklist--checkbox">
										<div className="form-checklist--label">
											<input type="checkbox" id="neotraditional" name="style" value={this.state.neotraditional} onChange={this.handleChange}/>
											<label htmlFor="neotraditional">Neo-Traditional</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="newschool" name="style" value={this.state.newschool} onChange={this.handleChange}/>
											<label htmlFor="newschool">New-School</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="realism" name="style" value={this.state.realism} onChange={this.handleChange}/>
											<label htmlFor="realism">Realism</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="script" name="style" value={this.state.script} onChange={this.handleChange}/>
											<label htmlFor="script">Script</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="traditional" name="style" value={this.state.traditional} onChange={this.handleChange}/>
											<label htmlFor="traditional">Traditional</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="tribal" name="style" value={this.state.tribal} onChange={this.handleChange}/>
											<label htmlFor="tribal">Tribal</label>
										</div>
										<div className="form-checklist--label">
											<input type="checkbox" id="watercolour" name="style" value={this.state.watercolour} onChange={this.handleChange}/>
											<label htmlFor="watercolour">Watercolour</label>
										</div>
									</section>
								</section>
						</section>
							{submit}
						</section>
						</form>
					</div>
				
					<div className="section fp-auto-height flex-container-parent">
						<StyleChecklist toggleFilter={this.toggleFilter}/>
					</div>
					<div className="section fp-auto-height flex-container-parent">
						<FilteredList artists={this.state.artists} filters={this.state.filters}/>
					</div>
					</div>
			// </div>
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
			<div className="flex-container">
				<div className="stylechecklist">
					<h2>filter by category</h2>
					
					<div className="stylechecklist-filters">

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="blackwork" onChange={this.props.toggleFilter} />
							<label>Blackwork</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="dotworkorsingleneedle" onChange={this.props.toggleFilter}/>
							<label>Dotwork or Single Needle</label>
						</div>
					
						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="geometric" onChange={this.props.toggleFilter}/>
							<label>Geometric</label>
						</div>
						
						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="handpoke" onChange={this.props.toggleFilter} />
							<label>Handpoke</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="ignorant" onChange={this.props.toggleFilter}/>
							<label>Ignorant</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="japanese" onChange={this.props.toggleFilter}/>
							<label>Japanese</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="linework" onChange={this.props.toggleFilter} />
							<label>Linework</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="neotraditional" onChange={this.props.toggleFilter}/>
							<label>Neo-Traditional</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="newschool" onChange={this.props.toggleFilter}/>
							<label>New-School</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="realism" onChange={this.props.toggleFilter} />
							<label>Realism</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="script" onChange={this.props.toggleFilter}/>
							<label>Script</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="traditional" onChange={this.props.toggleFilter}/>
							<label>Traditional</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="tribal" onChange={this.props.toggleFilter} />
							<label>Tribal</label>
						</div>

						<div className="form-checklist--label">
							<input type="checkbox" name="style" value="watercolour" onChange={this.props.toggleFilter}/>
							<label>Watercolour</label>
						</div>
					</div>
					<p><a href="#forthPage">go to filtered list</a></p>
				</div>
			</div>
		)
	}
}

class ArtistListItem extends React.Component {
	render () {
		return (
				<ul>
					<li>
						<p><span>Name</span> {this.props.artist.name}</p>
						<p><span>Instagram</span> {this.props.artist.instagram}</p>
						<p><span>Shop</span> {this.props.artist.shop}</p>
						<p><span>Neighbourhood</span> {this.props.artist.neighbourhood}</p>
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
				</ul>
		)
	}
}

class FilteredList extends React.Component {
	render() {
		const filteredList = this.props.artists.filter(artist => {
			var isMatched;
					this.props.filters.forEach(filteredStyle => {
				if (artist[filteredStyle]) {
					isMatched = true;
				};
			})
			return isMatched;
		})
		return (
			<div className="flex-container">
				<h2 className="stylechecklist-filteredlist--title">my filtered list</h2>
				
				<div className="links">
					<div className="link-style"><a href="#thirdPage">back to filter by category</a></div>
					<div className="link-top"><a href="#firstPage">back to top</a></div>
				</div>
				
				<div className="stylechecklist-filteredlist">
						{ filteredList.map((artist, index) => <ArtistListItem key={index} artist={artist}/>) }
				</div>
			</div>
		)
	}
}
ReactDOM.render(<App/>, document.getElementById("app"));
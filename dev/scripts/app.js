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

//displaying first component
class Listing extends React.Component {
    render() {
        console.log(this.props.listing)
        console.log(Array.isArray(this.props.listing))
        return (
            <ul>
                {
                    this.props.listing.map((artist, index) => { 
                        return (
                            <li key={index}>
                                <p>Name: {artist.Name}</p>
                                <p>Instagram: {artist.Instagram}</p>
                                <p>Shop: {artist.Shop}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			instagram: "",
			shop: "",
			neighbourhood: "",
			style: "",
			listing: []
		}
		//binding methods to main constructor
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
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
		dbRef.push(this.state)
		this.setState({
			name: name,
			instagram: instagram,
			shop: shop,
			neighbourhood: neighbourhood,
			style: style
		})

		// console.log(this.state)

	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input name="name" type="text" placeholder="artist name" onChange={this.handleChange}/>
					<input name="instagram" type="text" placeholder="instagram" onChange={this.handleChange}/>
					<input name="shop" type="text" placeholder="shop" onChange={this.handleChange}/>
					<input name="neighbourhood" type="text" placeholder="neighbourhood" onChange={this.handleChange}/>


					<legend>style</legend>
			
					  <input type="checkbox" id="blackwork" name="style" value="blackwork" onChange={this.handleChange}/>
					  <label for="blackwork">Blackwork</label>
					
					  <input type="checkbox" id="dotwork" name="style" value="dotwork" onChange={this.handleChange}/>
					  <label for="dot work or single needle">Dotwork or Single Needle</label>

					  <input type="checkbox" id="geometric" name="style" value="geometric" onChange={this.handleChange}/>
					  <label for="geometric">Geometric</label>
					  
					  <input type="checkbox" id="handpoke" name="style" value="handpoke" onChange={this.handleChange}/>
					  <label for="handpoke">Handpoke</label>

					  <input type="checkbox" id="ignorant" name="style" value="ignorant" onChange={this.handleChange}/>
					  <label for="ignorant">Ignorant</label>
					  
					  <input type="checkbox" id="japanese" name="style" value="japanese" onChange={this.handleChange}/>
					  <label for="japanese">Japanese</label>

					  <input type="checkbox" id="linework" name="style" value="linework" onChange={this.handleChange}/>
					  <label for="linework">Linework</label>
					  
					  <input type="checkbox" id="neo-traditional" name="style" value="neo-traditional" onChange={this.handleChange}/>
					  <label for="neo-traditional">Neo-Traditional</label>

					  <input type="checkbox" id="new-school" name="style" value="new-school" onChange={this.handleChange}/>
					  <label for="new-school">New-School</label>
					  
					  <input type="checkbox" id="realism" name="style" value="realism" onChange={this.handleChange}/>
					  <label for="realism">Realism</label>

					  <input type="checkbox" id="script" name="style" value="script" onChange={this.handleChange}/>
					  <label for="script">Script</label>
					  
					  <input type="checkbox" id="traditional" name="style" value="traditional" onChange={this.handleChange}/>
					  <label for="traditional">Traditional</label>

					  <input type="checkbox" id="tribal" name="style" value="tribal" onChange={this.handleChange}/>
					  <label for="tribal">Tribal</label>
					  
					  <input type="checkbox" id="watercolour" name="style" value="watercolour" onChange={this.handleChange}/>
					  <label for="watercolour">Watercolour</label>
					 



					<input type="submit" value="submit"/>
				</form>
				<Listing listing={this.state.listing} />
			</div>
		)
	}
	componentDidMount(){
		dbRef.on("value", (snapshot) => {
			const data = snapshot.val();
			this.setState({ listing: data });
		});
	}
}


ReactDOM.render(<App/>, document.getElementById("app"));



// <select name="style" onChange={this.handleChange}>
// 	<option name="" value="choose a style">choose a style</option>
// 	<option name="" value="blackwork">blackwork</option>
// 	<option name="" value="dot work/single needle">dot work/single needle</option>
// 	<option name="" value="geometric">geometric</option>
// 	<option name="" value="handpoke">handpoke</option>
// 	<option name="" value="ignorant">ignorant</option>
// 	<option name="" value="japanese">japanese</option>
// 	<option name="" value="linework">linework</option>	
// 	<option name="" value="neo-traditional">linework</option>	
// 	<option name="" value="new-school">linework</option>	
// 	<option name="" value="realism">realism</option>
// 	<option name="" value="script">script</option>
// 	<option name="" value="traditional">traditional</option>
// 	<option name="" value="tribal">tribal</option>
// 	<option name="" value="watercolour">watercolour</option>
// </select>
// 
// 
// 
// 
// 
// 			<ul>
// 				{
// 					Object
// 						//stores each key into an array
// 						.keys(this.props.listing)
// 						//loop through array of keys to do stuff
// 						.map((key, index) => {
// 							const artist = this.props.listing[key]
// 							// console.log(artist.name);

// 								return (
// 									<li>
// 										<p>{artist.name}</p>
// 										<p>{artist.instagram}</p>
// 										<p>{artist.shop}</p>
// 									</li>
// 								)
// 						})
// 				}
// 			</ul>
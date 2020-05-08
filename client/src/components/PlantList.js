import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
	constructor() {
		super();
		this.state = {
			plants: [],
			filterInput: ""
		}
	}

	// You can also define state like this if you don't need anything else in the constructor function
	// state = {
	// 	plants: []
	// }

	filterPlants = e => {
		this.setState({
			filterInput: e.target.value
		});
		// console.log(this.state.filterInput);
		// this.state.plants.filter(plant => {
		// 	plant.name.includes(this.state.filterInput);
		// })
		// console.log(filteredPlants);
		// this.setState({
		// 	plants: [this.state.plants.filter(plant => {
		// 		plant.name.includes(this.state.filterInput);
		// 	})]
		// })
		// console.log(this.state.plants);
		// console.log(this.state.plants);
		// this.setState({
		// 	plants: filteredPlants
		// });
		// this.state.plants.filter(plant => {
		// 	console.log(plant.name);
		// })
	}

	componentDidMount() {
		axios.get('http://localhost:3333/plants')
			.then(res => {
				this.setState({
					plants: res.data.plantsData
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	/*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
	render() {
		return (
			<main className="plant-list">
				<input type="search" placeholder="filter plants" onChange={this.filterPlants}/>
				{this.state?.plants?.map((plant) => (
					<div className="plant-card" key={plant.id}>
						<img className="plant-image" src={plant.img} alt={plant.name} />
						<div className="plant-details">
							<h2 className="plant-name">{plant.name}</h2>
							<p className="plant-scientific-name">{plant.scientificName}</p>
							<p>{plant.description}</p>
							<div className="plant-bottom-row">
								<p>${plant.price}</p>
								<p>☀️ {plant.light}</p>
								<p>💦 {plant.watering}x/month</p>
							</div>
							<button
								className="plant-button"
								onClick={() => this.props.addToCart(plant)}
								>
									Add to cart
							</button>
						</div>
					</div>
				))}
			</main>
		);
	}
}

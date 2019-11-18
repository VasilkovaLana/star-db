import React, { Component } from 'react';

import './people-page.css';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	constructor() {
		super();
		this.state = {
			selectedPerson: 1,
			hasError: false
		}
	}

	componentDidCatch() {
		this.setState({
			hasError: true
		});
	}

	onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

	render() {

		if (this.state.hasError){
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
         >
        
        {(i) => `${i.name} (${i.birthYear})`}

      </ItemList>
    );

    const personDetails = (
      <PersonDetails 
        personId={this.state.selectedPerson} />
    );

    return (
      <div>
        <Row left={itemList} right={personDetails} />
      </div>
    );
	}	
}
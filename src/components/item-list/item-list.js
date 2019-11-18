import React, { Component } from 'react';

import './item-list.css';
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {

  constructor() {
    super();
    this.state = {
      itemList: null 
    }
  }

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      console.log(this.props.children)
      const label = this.props.children(item);
      
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      );
    });
  }

  render() {

    const { itemList } = this.state;

    if(!itemList){
      return <Spinner />
    }

    const items = this.renderItems(itemList);
    
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}

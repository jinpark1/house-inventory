import React, { Component } from 'react';
import './House.css';
import axios from 'axios';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class House extends Component {
  constructor(){
    super();

    this.state = {
      inventory: null,
      loading: true,
    }
  };

  componentDidMount(){
    axios.get('/api/inventory')
      .then(res => {
      this.setState({
        loading: false,
        inventory: res.data
      })
    })
    .catch( error => {
      console.log(error);
    })
  };

  render() {
    let inventory = this.state.inventory ? this.state.inventory.map( (e, i) => {
      return (
        <div key={i} className="HouseList">
          <img src={e.image} alt={"House"} />
          <div className="HouseList-Description">
            <span>{e.name}</span>
            <span>Price: {e.price}</span>
            <span>Swimming Pool: {e.swimming_pool}</span>
          </div>
        </div>
      );
    }) : null;
    return (
      <div className="House">
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={'#000000'}
          loading={this.state.loading}
        />
        {inventory}
      </div>
    );
  }
}

export default House;

import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
import { ItemCard } from './ItemCard';
import * as products from './products.json'


class App extends React.Component {
  product = products.product
  render() {
    const itemsList = this.product.map(product =>
      <ItemCard name={product.name} img={product.img} price={product.price} />
      )
    return(
      <Segment style={{display: 'flex', flexDirection: 'row'}}>
      {itemsList}
      </Segment>
    )
  }
}

export default App;

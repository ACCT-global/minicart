import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import productsQuery from './queries/productsQuery.gql'

import ShelfItem from './components/ShelfItem'
import WrappedSpinner from './components/WrappedSpinner'

class Shelf extends Component {
  static propTypes = {
    data: PropTypes.object,
    query: PropTypes.string,
    title: PropTypes.string,
  }

  static schema = {
    component: 'Shelf',
    description: 'A product shelf featuring a collection',
    type: 'object',
    properties: {
      title: {
        title: 'Title',
        type: 'string',
      },
      orderBy: {
        type: 'string',
        enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC'],
        enumNames: ['Sales', 'Price, descending', 'Price, ascending'],
        title: 'Order by',
      },
      collection: {
        title: 'Collection',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      from: {
        title: 'From',
        type: 'number',
      },
    },
  }

  render() {
    const { data, title } = this.props
    return (
      <div>
        {data.loading && <WrappedSpinner />}
        {!data.loading &&
          title && <h1 className="ph8 pt8 f2 serious-black">{title}</h1>}
        {!data.loading && (
          <div className="flex flex-row-ns flex-column-s items-center ph8 pb8">
            {data.products.map(product => (
              <ShelfItem
                key={product.productId}
                imageUrl={product.items[0].images[0].imageUrl}
                name={product.productName}
                price={product.items[0].sellers[0].commertialOffer.Price}
                productId={product.linkText}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
}

const options = {
  options: ({
    query = '',
    category = '',
    specificationFilters = '',
    priceRange = '',
    collection = '',
    orderBy = '',
    from = 0,
    quantity = 4,
    salesChannel = '',
  }) => ({
    variables: {
      query,
      category,
      specificationFilters: specificationFilters ? [specificationFilters] : [],
      priceRange,
      collection,
      orderBy,
      from,
      to: from + quantity - 1,
      salesChannel,
    },
  }),
}

const ShelfWithData = graphql(productsQuery, options)(Shelf)

export default ShelfWithData

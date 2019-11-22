import React, {useState, useEffect} from 'react';
import './search.scss';
import { Search, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({handleSearch, searchResults, searchLoading}) => {
  const [searchText, setSearchText] = useState('');
  const handleSearchText = async (e, data) => {
    setSearchText(data.value);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [handleSearch, searchText]);

  const customRenderer = (product) => {
    return(
      <Link to={`/products/${product.product_id}`} key={product.id}>
        <div className="result">
          <div className="image">
            <Image src={require(`../../assets/product_images/${product.thumbnail}`)} alt={product.thumbnail} />
          </div>
          <div className="content">
            <div className="price">
              $
              {' '}
              {parseFloat(product.discounted_price) ? product.discounted_price : product.price}
            </div>
            <div className="title">
              {product.name}
            </div>
            <div className="description">
              {product.description.substring(0,20) + '...'}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={searchLoading}
          onSearchChange={handleSearchText}
          results={searchResults}
          value={searchText}
          resultRenderer={customRenderer}
        />
      </Grid.Column>
    </Grid>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  searchLoading: PropTypes.bool.isRequired
};

export default SearchBar;

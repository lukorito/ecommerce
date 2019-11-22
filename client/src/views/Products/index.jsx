import React from 'react';
import {connect} from 'react-redux';
import {
  fetchProductDepartment,
  fetchProducts,
} from '../../redux/actions/productsActions';
import Paginator from '../../components/Paginator';
import Spinner from '../../components/Spinner';
import './products.scss';
import ProductsContainer from '../../components/ProductsContainer';
import PropTypes from 'prop-types';

class Products extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      page: 1
    };
  }
  componentDidMount() {
    this.handleFetch();
  }

  componentWillReceiveProps(nextProps) {
    const {products} = this.props;
    if(nextProps.products !== products) {
      this.setState({
        products: nextProps.products
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    const {page} = this.state;
    const {params: { departmentId }} = match;
    if(prevProps.match.params.departmentId !== departmentId || prevState.page !== page) {
      this.handleFetch();
    }
  }

  handleFetch = () => {
    const { fetchProducts, fetchProductDepartment, match } = this.props;
    const {page} = this.state;
    const {params: { departmentId }} = match;
    if(departmentId !== undefined){
      fetchProductDepartment(departmentId);
    } else  {
      fetchProducts(page);
    }
  };

  handlePageChange = (event, data) => {
    const {activePage} = data;
    this.setState({
      page: activePage
    });
  };

  render () {
    const {products} = this.state;
    const {loading, count, match} = this.props;
    const {params: { departmentId }} = match;
    let totalpages;
    if(count) {
      totalpages = Math.ceil(count/10);
    }
    return  (
      <div className="products-wrapper">
        <Spinner isLoading={loading} />
        <div className="products-container">
          <ProductsContainer products={products} />
        </div>
        {!departmentId && (
          <div className="pagination">
            <Paginator pageChange={this.handlePageChange} totalPages={totalpages} />
          </div>
        )}
      </div>
    );
  }
}

Products.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  fetchProductDepartment: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      departmentId: PropTypes.string
    })
  }).isRequired,
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  count: PropTypes.string
};

Products.defaultProps = {
  count: ''
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
  total: state.total.total,
  count: state.products.count
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page) => dispatch(fetchProducts(page)),
    fetchProductDepartment: (departmentId) => dispatch(fetchProductDepartment(departmentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

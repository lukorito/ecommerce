import React from 'react';
import {connect} from 'react-redux';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {fetchProducts} from '../../redux/actions/productsActions';
import Paginator from '../../components/Paginator';
import Spinner from '../../components/Spinner';
import './products.scss';
import SideBar from '../../components/SideBar';

class Products extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      page: 1
    };
  }
  componentDidMount() {
    const { fetchProducts,} = this.props;
    const {page} = this.state;
    fetchProducts(page);
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
    const { fetchProducts } = this.props;
    const {page} = this.state;
    if(prevState.page !== page){
      fetchProducts(page);
    }
  }

  handlePageChange = (event, data) => {
    const {activePage} = data;
    this.setState({
      page: activePage
    });
  };

  render () {
    const {products} = this.state;
    const {loading} = this.props;
    return  (
      <div className="wrapper">
        <Spinner isLoading={loading} />
        <div className="products-container">
          <SideBar />
          <div className="grid-container">
            {
              products.map((product) => {
                return (
                  <Link to={`/products/${product.product_id}`} key={product.product_id}>
                    <div className="grid-item">
                      <Image src={require(`../../assets/product_images/${product.thumbnail}`)} alt={product.thumbnail} />
                      <div className="description">
                        <h4>{product.name}</h4>
                        <div>{product.description}</div>
                        <div className="product-price">
                          Price:
                          {parseInt(product.discounted_price, 10)
                            ? (
                              <div>
                                <span>
                                  {' '}
                                  {product.discounted_price}
                                  {' '}
                                </span>
                                <span>{product.price}</span>
                              </div>

                            )
                            : (
                              <span>
                                {' '}
                                {product.price}
                                {' '}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            }
          </div>
        </div>
        <div className="pagination">
          <Paginator pageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
  total: state.total.total
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page) => dispatch(fetchProducts(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

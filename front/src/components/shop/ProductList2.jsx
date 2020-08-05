import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product2 from './Product2';
import SearchBox from './searchbox';
import '../../CSS/shop/products.css';
export default class ProductList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemId: null,
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/api/offers')
            .then((res) => res.json())
            .then((json) => {
                console.log("Item get in offer",json);
                // setTimeout(() => {
                this.setState({ items: json });
                // }, 3000)
            })
            .catch((err) => console.log(err));
    }
    handleSearch = (query) => {
        this.setState({
            searchQuery: query,
        });
    };
    getPagedData = () => {
        const { searchQuery, items: allProducts } = this.state;
        let filtered = allProducts;
        if (searchQuery)
            filtered = allProducts.filter((m) => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else
            filtered = allProducts;
        return { data: filtered };
    };
    render() {
        let { searchQuery } = this.state;
        const { data } = this.getPagedData();
        return (<>
            <main>
                <div className="search">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#">
                            WholeSale Shop
              </a>
                        <form class="form-inline my-2 my-lg-0 ml-auto">
                            <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        </form>
                    </nav>
                </div>
                <div className="main--container">
                    {data.map((item) => {
                        return (<div key={item._id}>
                            <Link to={`/offers/${item._id}`}>
                                <Product2 key={item._id} item={item} editable={this.props.editable} URLtoEdit={this.props.URLtoEdit} />
                            </Link>
                        </div>);
                    })}
                </div>
            </main>
        </>);
    }
}

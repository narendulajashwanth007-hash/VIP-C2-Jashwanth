import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');
  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get('category') || '');
    setSearch(searchParams.get('search') || '');
    setGender(searchParams.get('gender') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (gender) params.gender = gender;
        if (sort) params.sort = sort;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (discount) params.discount = discount;

        const res = await getProducts(params);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [category, gender, sort, minPrice, maxPrice, discount, search]);

  const clearFilters = () => {
    setCategory('');
    setGender('');
    setSort('');
    setMinPrice('');
    setMaxPrice('');
    setDiscount('');
    setSearch('');
  };

  return (
    <div className="products-page" id="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        {search && <p className="search-info">Showing results for: "<strong>{search}</strong>"</p>}
        <p className="results-count">{products.length} products found</p>
      </div>

      <button className="filter-toggle-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
        {filtersOpen ? '✕ Close Filters' : '⚙️ Filters & Sort'}
      </button>

      <div className="products-layout">
        <aside className={`filters-sidebar ${filtersOpen ? 'open' : ''}`} id="filters-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Gender</h4>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="filter-select">
              <option value="">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="price-input" />
              <span>—</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="price-input" />
            </div>
          </div>

          <div className="filter-group">
            <h4>Min Discount</h4>
            <select value={discount} onChange={(e) => setDiscount(e.target.value)} className="filter-select">
              <option value="">Any</option>
              <option value="10">10% & above</option>
              <option value="20">20% & above</option>
              <option value="30">30% & above</option>
              <option value="50">50% & above</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Sort By</h4>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
              <option value="">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <main className="products-main">
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <span className="no-products-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default Products;

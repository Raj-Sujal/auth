import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalErrors, setModalErrors] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 8 };
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await api.get('/products', { params });
      if (res.data?.success) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalErrors([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setModalErrors([]);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    setModalErrors([]);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      if (err.response?.data?.errors) {
        setModalErrors(err.response.data.errors);
      } else {
        setModalErrors([{ field: 'name', message: err.response?.data?.message || 'Error saving product' }]);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Products Catalog</h1>
          <p className="text-slate-400 text-sm">Manage and view e-commerce products</p>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleOpenAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            + Add Product
          </button>
        )}
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm flex-1"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Audio">Audio</option>
          <option value="Books">Books</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-slate-400 bg-slate-800/40 rounded border border-slate-700">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onEdit={handleOpenEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-slate-800 border border-slate-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-slate-800 border border-slate-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingProduct}
        apiErrors={modalErrors}
      />
    </div>
  );
};

export default Products;

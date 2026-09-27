import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData = null, apiErrors = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        stock: initialData.stock || '',
      });
    } else {
      setFormData({ name: '', description: '', price: '', category: '', stock: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getFieldError = (field) => {
    const found = apiErrors.find((err) => err.field === field);
    return found ? found.message : null;
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {initialData ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            {getFieldError('name') && (
              <p className="text-xs text-red-400 mt-1">{getFieldError('name')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            {getFieldError('category') && (
              <p className="text-xs text-red-400 mt-1">{getFieldError('category')}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
              />
              {getFieldError('price') && (
                <p className="text-xs text-red-400 mt-1">{getFieldError('price')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
              />
              {getFieldError('stock') && (
                <p className="text-xs text-red-400 mt-1">{getFieldError('stock')}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            ></textarea>
            {getFieldError('description') && (
              <p className="text-xs text-red-400 mt-1">{getFieldError('description')}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;

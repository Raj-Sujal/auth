import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <span className="text-xs text-slate-400">
            Stock: {product.stock}
          </span>
        </div>
        <h3 className="font-bold text-lg text-white mb-1">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
      </div>

      <div>
        <div className="text-xl font-bold text-emerald-400 mb-3">
          ${product.price}
        </div>
        {isAuthenticated && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs py-1.5 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="flex-1 bg-red-600/80 hover:bg-red-600 text-white text-xs py-1.5 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

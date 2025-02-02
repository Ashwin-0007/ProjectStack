import React, { useState } from 'react';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [productImage, setProductImage] = useState('');
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token'); // Ensure token is retrieved
    if (!token) {
      setMessage('User not authenticated');
      setLoading(false);
      return;
    }

    const newProject = {
      title,
      productImage,
      price,
      shortDescription,
      description,
      productUrl,
      category,
      tags,
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/projects/create', {
        method: 'POST', // Changed to POST
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Project created successfully!');
      } else {
        setMessage(data.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage('Error creating project');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-black">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Project</h2>

      {message && (
        <div className={`p-3 mb-4 text-center text-white rounded-md ${message.includes('success') ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="productImage" className="block text-lg font-medium text-gray-700">Product Image URL</label>
          <input
            type="url"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700">Short Description</label>
          <input
            type="text"
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter short description"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter detailed description"
            rows="4"
            required
          />
        </div>

        {/* Product URL */}
        <div>
          <label htmlFor="productUrl" className="block text-lg font-medium text-gray-700">Product URL</label>
          <input
            type="url"
            id="productUrl"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product URL"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags (comma separated)"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full p-3 mt-4 font-semibold rounded-md text-white transition duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;

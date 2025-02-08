import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status === "success") {
          setProject(data.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <div className="text-center mt-8 text-2xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg shadow-2xl text-black mt-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
        {project.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-6">
          {project.productImage.map((image, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
              />
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Price</h2>
            <p className="text-2xl font-bold text-blue-600">${project.price}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Short Description</h2>
            <p className="text-lg text-gray-700">{project.shortDescription}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Description</h2>
            <p className="text-lg text-gray-700">{project.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Product URL</h2>
            <a
              href={project.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-500 hover:text-blue-700 hover:underline"
            >
              {project.productUrl}
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Category</h2>
            <div className="flex flex-wrap gap-2">
              {project.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
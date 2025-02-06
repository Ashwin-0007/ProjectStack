import { useEffect, useState } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const token = localStorage.getItem("user_token"); // Get the token from localStorage
          const response = await fetch("http://localhost:8000/api/v1/projects", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
      
          const data = await response.json();
          if (data.status === "success") {
            setProjects(data.data);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
    };      

    fetchProjects();
  }, []);
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={project.productImage[0]} alt={project.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.shortDescription}</p>
            <p className="text-gray-900 font-bold mt-2">${project.price}</p>
            <a href={`/projects/${project.id}`} className="block mt-4 text-blue-500 hover:underline">
              View Project
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;

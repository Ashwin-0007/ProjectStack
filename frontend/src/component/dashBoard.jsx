import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ searchBar}) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch("http://localhost:8000/api/v1/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status === "success") {
          setProjects(data.data);
          setFilteredProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchBar.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchBar, projects]);

  const handleSelectedProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === "success") {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        setFilteredProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={project.productImage[0]}
            alt={project.title}
            onClick={() => handleSelectedProject(project.id)}
            className="w-full h-48 object-cover transform transition-all duration-300 hover:scale-110"
          />
          <div className="p-4">
            <h2
              className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
              
            >{highlightText(project.title, searchBar)}</h2>
            <p className="text-gray-600 mt-2">{project.shortDescription}</p>
            <p className="text-gray-900 font-bold mt-2">${project.price}</p>
            <div className="flex justify-between mt-4">
              <div
                onClick={() => handleSelectedProject(project.id)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer transition-colors duration-300"
              >
                View Project
              </div>
              <div
                onClick={() => handleDeleteProject(project.id)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer transition-colors duration-300"
              >
                Delete Project
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
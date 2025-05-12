import projectsIcon from "../../../assets/svg/projects.svg";

export default function ProjectsCard({ count }) {
  return (
    <div className="flex items-center p-4 bg-green-100 rounded-lg shadow">
      <img src={projectsIcon} alt="Projects" className="w-10 h-10 mr-4" />
      <div>
        <p className="text-gray-600">Proiecte</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}

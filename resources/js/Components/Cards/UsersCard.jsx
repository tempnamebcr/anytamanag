import usersIcon from "../../../assets/svg/users.svg";

export default function UsersCard({ count }) {
  return (
    <div className="flex items-center p-4 bg-blue-100 rounded-lg shadow">
      <img src={usersIcon} alt="Users" className="w-10 h-10 mr-4" />
      <div>
        <p className="text-gray-600">Angajati</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}

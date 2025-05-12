import {orderOptions} from "@/Helpers/helper";
import ordersIcon from "../../../assets/svg/orders.svg";

export default function OrdersCard({ ordersCount }) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <img src={ordersIcon} alt="Orders" className="w-10 h-10 mr-4" />
          <p className="text-gray-600 text-lg font-semibold">Comenzi</p>
        </div>
        <ul>
          {orderOptions.map(({ value, label, bgColor }) => (
            <li key={value} className={`flex justify-between p-2 rounded-lg ${bgColor}`}>
              <span>{label}</span>
              <span className="font-bold">{ordersCount[value] || 0}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

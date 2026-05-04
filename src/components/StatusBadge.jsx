import React from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const StatusBadge = ({ type, status }) => {
  const getConfig = () => {
    // PAYMENT STATUS
    if (type === "payment") {
      switch (status) {
        case "paid":
          return {
            text: "Đã thanh toán",
            color: "bg-green-100 text-green-700",
            icon: <FaCheckCircle />
          };
        case "unpaid":
          return {
            text: "Chưa thanh toán",
            color: "bg-yellow-100 text-yellow-700",
            icon: <FaClock />
          };
        case "failed":
          return {
            text: "Thanh toán lỗi",
            color: "bg-red-100 text-red-700",
            icon: <FaTimesCircle />
          };
        default:
          return {
            text: status,
            color: "bg-gray-100 text-gray-700"
          };
      }
    }

    // DELIVERY STATUS
    if (type === "delivery") {
      switch (status) {
        case "pending":
          return {
            text: "Chờ xử lý",
            color: "bg-yellow-100 text-yellow-700",
            icon: <FaClock />
          };
        case "processing":
          return {
            text: "Đang xử lý",
            color: "bg-blue-100 text-blue-700"
          };
        case "shipped":
          return {
            text: "Đang giao",
            color: "bg-purple-100 text-purple-700"
          };
        case "delivered":
          return {
            text: "Đã giao",
            color: "bg-green-100 text-green-700",
            icon: <FaCheckCircle />
          };
        case "cancelled":
          return {
            text: "Đã huỷ",
            color: "bg-red-100 text-red-700",
            icon: <FaTimesCircle />
          };
        default:
          return {
            text: status,
            color: "bg-gray-100 text-gray-700"
          };
      }
    }
  };

  const { text, color, icon } = getConfig();

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1  text-[10px] font-medium rounded ${color}`}>
      {icon && icon}
      {text}
    </span>
  );
};

export default StatusBadge;
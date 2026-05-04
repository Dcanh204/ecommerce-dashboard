import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { MdPayment, MdOutlineDiscount } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
export const allNav = [
  {
    id: 1,
    title: 'Trang chủ',
    icon: <AiOutlineDashboard />,
    role: 'admin',
    path: '/admin/dashboard'
  },
  {
    id: 2,
    title: 'Đơn hàng',
    icon: <AiOutlineShoppingCart />,
    role: 'admin',
    path: '/admin/dashboard/orders'
  },
  {
    id: 3,
    title: 'Danh mục',
    icon: <BiCategory />,
    role: 'admin',
    path: '/admin/dashboard/category'
  },
  {
    id: 4,
    title: 'Người bán',
    icon: <FaUsers />,
    role: 'admin',
    path: '/admin/dashboard/sellers'
  },
  {
    id: 5,
    title: 'Yêu cầu rút tiền',
    icon: <MdPayment />,
    role: 'admin',
    path: '/admin/dashboard/payment-request'
  },
  {
    id: 6,
    title: 'Vô hiệu hóa',
    icon: <FaUserTimes />,
    role: 'admin',
    path: '/admin/dashboard/deactive-sellers'
  },
  {
    id: 7,
    title: 'Yêu cầu người bán',
    icon: <FaCodePullRequest />,
    role: 'admin',
    path: '/admin/dashboard/sellers-request'
  },
  {
    id: 8,
    title: 'Nhắn tin',
    icon: <IoIosChatbubbles />,
    role: 'admin',
    path: '/admin/dashboard/chat-seller'
  },
  {
    id: 9,
    title: 'Trang chủ',
    icon: <IoIosChatbubbles />,
    role: 'seller',
    path: '/seller/dashboard'
  },
  {
    id: 10,
    title: 'Thêm sản phẩm',
    icon: <IoMdAdd />,
    role: 'seller',
    path: '/seller/dashboard/add-product'
  },
  {
    id: 11,
    title: 'Tất cả sản phẩm',
    icon: <LuClipboardList />,
    role: 'seller',
    path: '/seller/dashboard/products'
  },
  {
    id: 12,
    title: 'Giảm giá',
    icon: <MdOutlineDiscount />,
    role: 'seller',
    path: '/seller/dashboard/discount-product'
  },
  {
    id: 13,
    title: 'Đơn hàng',
    icon: <AiOutlineShoppingCart />,
    role: 'seller',
    path: '/seller/dashboard/orders'
  },
  {
    id: 14,
    title: 'Thanh toán',
    icon: <MdPayment />,
    role: 'seller',
    path: '/seller/dashboard/payments'
  },
  {
    id: 15,
    title: 'Nhắn tin',
    icon: <IoIosChatbubbles />,
    role: 'seller',
    path: '/seller/dashboard/chat-customer'
  },
  {
    id: 16,
    title: 'Hỗ trợ',
    icon: <IoChatbubbleEllipsesOutline />,
    role: 'seller',
    path: '/seller/dashboard/chat-support'
  },
  {
    id: 17,
    title: 'Thông tin tài khoản',
    icon: <CgProfile />,
    role: 'seller',
    path: '/seller/dashboard/profile'
  },
]
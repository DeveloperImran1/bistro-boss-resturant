import { FaAd, FaCalendar, FaCartPlus, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    console.log(isAdmin)

    return (
        <div className="flex" >
            <div className="w-64 min-h-full bg-orange-400" >
                <ul className="menu" >
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminHome" >
                                <FaHome></FaHome> Admin Home
                            </NavLink></li>

                            <li><NavLink to="/dashboard/addItems" >
                                <FaUtensils></FaUtensils> Add Items
                            </NavLink></li>

                            <li><NavLink to="/dashboard/manageItems" >
                                <FaList></FaList> Manage Items
                            </NavLink></li>

                            <li><NavLink to="/dashboard/bookings" >
                                <FaAd></FaAd> Manage Bookings
                            </NavLink></li>

                            <li><NavLink to="/dashboard/users" >
                                <FaUsers></FaUsers> All Users
                            </NavLink></li>
                        </> : <>

                            <li><NavLink to="/dashboard/userHome" >
                                <FaHome></FaHome> User Home
                            </NavLink></li>

                            <li><NavLink to="/dashboard/cart" >
                                <FaCartPlus></FaCartPlus> My Cart ({cart.length})
                            </NavLink></li>

                            <li><NavLink to="/dashboard/reservation" >
                                <FaCalendar></FaCalendar> Reservation
                            </NavLink></li>

                            <li><NavLink to="/dashboard/review" >
                                <FaAd></FaAd> Add a Review
                            </NavLink></li>

                            <li><NavLink to="/dashboard/paymentHistory" >
                                <FaList></FaList> Payment Real History
                            </NavLink></li>
                        </>
                    }

                    {/* ai gulo sobai dekhte parbe mane common   */}
                    <div className="divider"></div>

                    <li><NavLink to="/" >
                        <FaHome></FaHome> Home
                    </NavLink></li>

                    <li><NavLink to="/order/salad" >
                        <FaSearch></FaSearch> Order
                    </NavLink></li>

                    <li><NavLink to="/order/contact" >
                        <FaEnvelope></FaEnvelope> Contact
                    </NavLink></li>

                </ul>

            </div>
            <div className="flex-1 p-8" >
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
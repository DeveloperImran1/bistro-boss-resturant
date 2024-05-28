import { FaEdit, FaTrashAlt, FaUser } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure()

    const handleDelete =  (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data)
                if(res.data.deletedCount){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name}  has been deleted.`,
                        icon: "success"
                      });
                }

       
            }
          });

        
    }
    return (
        <div>
            <div className="flex" >
                <h2 className="text-3xl" >Manage All Items</h2>
                {/* <h2 className="text-3xl" >Total Users: {users.length} </h2> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            menu.map((item, index) => <tr key={item._id} className="bg-base-200 w-full ">
                                <th>{index + 1}</th>
                                <td><img className="h-[70px] w-[70px] rounded-xl" src={item.image} alt="" /></td>
                                <td>{item.name}</td>
                                <td>{item.price} </td>
                                <td>
                                    <Link to={`/dashboard/update/${item._id}`} className="btn btn-ghost btn-lg">
                                        <FaEdit className="text-red-500" ></FaEdit>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-500" ></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
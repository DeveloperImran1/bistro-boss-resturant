import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();

    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart()   // aikhane useCart k call korle akta array pabo,, jar 1st index a ase cart jeita koita food add koresi seita. ar 2nd index a ase refetch. amader dorkar refetch. so 1st er index er k distucture korini. korle kono somossa nai. But jodi na kori tahole , comma dita hobe. ar object k distucture korar somoi sudho nam dilai hoi.

    const handleAddtoCart = (food) => {
        if (user && user?.email) {
            // send cart item to the DB
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            console.log(cartItem)

            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // refetch cart to update the cart items count
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please Login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddtoCart(item)}
                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">
                        Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
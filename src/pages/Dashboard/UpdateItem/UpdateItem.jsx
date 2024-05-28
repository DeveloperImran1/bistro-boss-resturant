import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'


const UpdateItem = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

    const { data: menuItem = {}, refetch } = useQuery({
        queryKey: ['menuItem'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu/${id}`)
            return res.data;
        }
    })
    console.log(menuItem)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit =async (data) => {
        const updateMenuItem = {
            name: data.name || menuItem.name,
            category: data.category || menuItem.category,
            price: parseFloat(data.price) || menuItem.price,
            recipe: data.recipe || menuItem.recipe,
            image: menuItem.image
        }
        console.log("Update item", updateMenuItem)
        const res =await axiosSecure.put(`/menu/${id}`, updateMenuItem);
        if(res.data.modifiedCount){
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} is Updated in DB`,
                showConfirmButton: false,
                timer: 1500
              });
        }

    }

    return (

        <div>
            <SectionTitle heading="add an item" subHeading="Whats new?" ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={menuItem.name} {...register("name")} type="text" placeholder="Recipe Name" className="input input-bordered input-warning w-full max-w-xs" />

                <div className="flex gap-6" >
                    <select defaultValue={menuItem.category} {...register("category")} className="select select-bordered w-full max-w-xs">
                        <option disabled value={"default"}>Select a category?</option>
                        <option value="salad" >Salad</option>
                        <option value="pizza" >pizza</option>
                        <option value="soup" >soup</option>
                        <option value="dessert" >dessert</option>
                        <option value="drinks" >drinks</option>
                    </select>
                    <input defaultValue={menuItem.price} {...register("price")} type="text" placeholder="Price" className="input input-bordered input-warning w-full max-w-xs" />

                </div>
                <div>
                    <textarea defaultValue={menuItem?.recipe} {...register("details")} className="textarea textarea-bordered" placeholder="Recipe Details"></textarea>

                </div>
                <div>
                    <input defaultValue={menuItem.image} {...register("image")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                </div>
                <input className="btn btn-secondary mt-6" type="submit" />
            </form>
        </div>
    );
};

export default UpdateItem;
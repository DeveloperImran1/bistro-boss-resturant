import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const image_hoisting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`
const AddItems = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

    const onSubmit = async(data) => {
        console.log(data)
        const imageFile = {image: data.image[0]};
        const res = await axiosPublic.post(image_hoisting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)

        if(res.data.success){
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post("/menu", menuItem);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added in DB`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="Whats new?" ></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input {...register("name")} type="text" placeholder="Recipe Name" className="input input-bordered input-warning w-full max-w-xs" />

                    <div className="flex gap-6" >
                        <select defaultValue={"default"} {...register("category")} className="select select-bordered w-full max-w-xs">
                            <option disabled value={"default"}>Select a category?</option>
                            <option value="salad" >Salad</option>
                            <option value="pizza" >pizza</option>
                            <option value="soup" >soup</option>
                            <option value="dessert" >dessert</option>
                            <option value="drinks" >drinks</option>
                        </select>
                        <input {...register("price")} type="text" placeholder="Price" className="input input-bordered input-warning w-full max-w-xs" />

                    </div>
                    <div>
                        <textarea {...register("details")} className="textarea textarea-bordered" placeholder="Recipe Details"></textarea>

                    </div>
                    <div>
                        <input {...register("image")} type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                    </div>
                    <input className="btn btn-secondary mt-6" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddItems;
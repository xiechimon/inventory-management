import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../redux/features/auth/authSlice";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
    getOneProduct,
    getProducts,
    selectProduct,
    updateProduct,
} from "../redux/features/product/productSlice";
import { useEffect, useState } from "react";
import ProductForm from "../components/products/ProductForm";

const EditProductPage = () => {
    const name = useSelector(selectName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
        if (file) {
            if (!["image/png", "image/jpeg"].includes(file.type)) {
                alert("仅支持 PNG 和 JPG 格式");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("文件大小不能超过 5MB");
                return;
            }

            // 生成预览URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);

        setImagePreview(
            productEdit && productEdit.image
                ? `${productEdit.image.filePath}`
                : null
        );

        setDescription(
            productEdit && productEdit.description
                ? productEdit.description
                : ""
        );
    }, [productEdit]);

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", product?.name);
        formData.append("category", product?.category);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("description", description);
        if (productImage) {
            formData.append("image", productImage);
        }

        // console.log(...formData);

        await dispatch(updateProduct({ id, formData }));
        await dispatch(getProducts());
        navigate("/dashboard");
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />
            <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                description={description}
                setDescription={setDescription}
                handleImageChange={handleImageChange}
                handleInputChange={handleInputChange}
                saveProduct={saveProduct}
            />
        </div>
    );
};

export default EditProductPage;

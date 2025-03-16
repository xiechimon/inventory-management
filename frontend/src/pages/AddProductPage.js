import { useState } from "react";
import Header from "../components/common/Header";
import ProductForm from "../components/products/ProductForm";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
};

const AddProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const { name, category, quantity, price } = product;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        // setProductImage(e.target.files[0]);
        // setImagePreview(URL.createObjectURL(e.target.files[0]));

        const file = e.target.files[0];
        setProductImage(file);
        if (file) {
            // 文件类型验证
            if (!["image/png", "image/jpeg"].includes(file.type)) {
                alert("仅支持 PNG 和 JPG 格式");
                return;
            }

            // 文件大小验证（5MB）
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

    const generateSKU = (category) => {
        // 随机生成三个大写字母
        const randomLetters = Array.from({ length: 3 }, () => {
            // 生成 A-Z 的随机字母（A 的 ASCII 码是 65，Z 是 90）
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }).join("");

        // const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = randomLetters + "-" + number;
        return sku;
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("sku", generateSKU(category));
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", productImage);

        console.log(...formData);

        await dispatch(createProduct(formData)); // 提交到数据库
        navigate("/dashboard");
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="添加库存" />
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

export default AddProductPage;

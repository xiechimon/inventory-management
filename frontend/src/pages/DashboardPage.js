import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectName } from "../redux/features/auth/authSlice";

import Header from "../components/common/Header";
import React, { useEffect } from "react";
import ProductsTable from "../components/products/ProductsTable";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { getProducts } from "../redux/features/product/productSlice";
import ProductSummary from "../components/products/ProductSummary";

const DashboardPage = () => {
    useRedirectLoggedOutUser("/auth");

    const name = useSelector(selectName);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isError, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <ProductSummary products={products} />
                <ProductsTable products={products} />
            </main>
        </div>
    );
};

export default DashboardPage;

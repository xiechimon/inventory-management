import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import { selectName } from "../redux/features/auth/authSlice";

const DashboardPage = () => {
    const name = useSelector(selectName);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />
        </div>
    );
};

export default DashboardPage;

import { Lock } from "lucide-react";
import SettingSection from "./ProfileSection";

const Security = () => {
    return (
        <SettingSection icon={Lock} title={"Security"}>
            <div className="mt-4">
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200
        "
                >
                    Change Password
                </button>
            </div>
        </SettingSection>
    );
};
export default Security;

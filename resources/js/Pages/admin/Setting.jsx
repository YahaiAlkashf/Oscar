import react from "react";
import Layout from "./Layout";

import Edit from "../Profile/Edit";
import UserManagement from "./Components/UserMangement";

export default function Setting({ mustVerifyEmail, status }) {
    return (
        <Layout>
            <>
            <Edit />
            <div className="pt-8"></div>
            <UserManagement  />
            </>
        </Layout>
    );
}

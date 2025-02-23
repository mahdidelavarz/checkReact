import { toast } from "react-toastify"; // Replacing Toast
import { Url } from "../Configs/Urls";
import storage from "./Storage"; // Import functional storage

// Token is fetched asynchronously, so we'll handle it within the GET function
let Token;

export async function GET(api, navigate) {
    // Ensure Token is fetched before making the request
    if (!Token) {
        await new Promise((resolve) => {
            storage.get("Token", (data) => {
                Token = data;
                resolve();
            });
        });
    }

    try {
        const response = await fetch(`${Url.serverUrl}${api}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `token ${Token}`,
            },
        });
        statusHandle(response.status, navigate); // Updated to use navigate
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
        return null;
    }
}

export function statusHandle(status, navigate) {
    // Status Handler for Network Responses
    if (status === 401) {
        console.log("کاربری با این مشخصات وجود ندارد");
        navigate("/SignIn");
    } else if (status === 500) {
        console.log("خطای سرویس‌دهنده‌ی داخلی دوباره تلاش کنید");
        toast.error("خطای سرویس‌دهنده‌ی داخلی. لطفاً دوباره تلاش کنید.");
    }
}

// Example usage of the GET method in a component
// async function getProfile(navigate) {
//   const response = await GET("Auth/profile", navigate);
//   console.log('data', response);
// }

// ! usage of get component________________________________________________________________________________
// import React, { use Effect } from "react";
// import { useNavigate } from "react-router-dom";
// import { GET } from "./Api"; // Assuming this file is named Api.js

// function ProfileComponent() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const response = await GET("Auth/profile", navigate);
//             console.log("Profile data:", response);
//         };
//         fetchProfile();
//     }, [navigate]);

//     return (
//         <div>
//             <h1>Profile Page</h1>
//             {/* Render profile data here */}
//         </div>
//     );
// }

// export default ProfileComponent;  

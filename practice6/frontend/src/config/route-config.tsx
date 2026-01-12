// import { createBrowserRouter } from "react-router-dom";
// import { SignUp } from "../pages/available/signup";
// import { Login } from "../pages/available/login";
// import { Profile } from "../pages/protected/profile";
// import { Protected } from "../pages/protected/layout";
// import { NotFound } from "../pages/available/error/not-found";
// import { Settings } from "../pages/protected/settings";


// export const routes = createBrowserRouter([
//     { path: "", element: <SignUp /> },
//     { path: "signin", element: <Login /> },
//     {
//         path: "account",
//         element: <Protected />,
//         children: [
//             { path: "", element: <Profile /> },
//             {
//                 path: "settings",
//                 element: <Settings />,
//             },
//         ],
//     },
//     { path: "*", element: <NotFound /> },
// ]);



import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "../pages/available/signup";
import { Login } from "../pages/available/login";
import { Profile } from "../pages/protected/profile";
import { Protected } from "../pages/protected/layout";
import { NotFound } from "../pages/available/error/not-found";
import { Settings } from "../pages/protected/settings";
import { Privacy } from "../pages/protected/settings/helpers/privacy";
// import { UpdatePassword } from "../pages/protected/settings/helpers/update-password";
// import { Bio } from "../pages/protected/settings/helpers/bio";

export const routes = createBrowserRouter([
    { path: "", element: <SignUp /> },
    { path: "signin", element: <Login /> },
    {
        path: "account",
        element: <Protected />,
        children: [
            { path: "", element: <Profile /> },

            {
                path: "settings",
                element: <Settings />,
                children: [
                    { path: "privacy", element: <Privacy /> },
                    // { path: "password", element: <UpdatePassword /> },
                    // { path: "bio", element: <Bio /> },
                ],
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

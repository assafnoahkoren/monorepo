import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.tsx";
import ProtectedLayout from "../layouts/ProtectedLayout.tsx";

const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/login',
                lazy: () => import("../pages/LoginPage.tsx")
            }
        ]
    },
    {
        element: <ProtectedLayout />,
        children: [
            {
                path: '',
                lazy: () => import("../pages/HomePage.tsx")
            },
        ]
    },
    {
      path: 'voucher/:voucherId/verify',
        lazy: () => import("../pages/VoucherVerifyPage.tsx")
    },
    {
        path: '*',
        lazy: () => import("../pages/ErrorPage.tsx")
    }
]);

const RouterLayer = () => {
    return <RouterProvider router={router}/>
}

export default RouterLayer;
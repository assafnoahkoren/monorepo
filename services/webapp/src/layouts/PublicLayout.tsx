import React from 'react';
import {Outlet} from "react-router-dom";

const PublicLayout: React.FC = () => {
    return (
        <div className="PublicLayout w-full h-full bg-red-500">
            <Outlet />
        </div>
    );
};

export default PublicLayout;

import React from 'react';
import {Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar.tsx";
import {Group} from "@mantine/core";

const ProtectedLayout: React.FC = () => {
    return (
        <div className="ProtectedLayout w-full h-full">
            <Group className="h-full">
                <Sidebar/>
                <Outlet/>
            </Group>
        </div>
    );
};

export default ProtectedLayout;

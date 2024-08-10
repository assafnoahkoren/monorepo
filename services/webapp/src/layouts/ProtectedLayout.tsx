import React from 'react';
import {Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar.tsx";
import {Group} from "@mantine/core";

const ProtectedLayout: React.FC = () => {
    return (
        <div className="ProtectedLayout w-full h-full">
            <Group className="h-full gap-0">
                <div className="h-full">
                    <Sidebar/>
                </div>
                <div className="h-full flex-1">
                    <Outlet/>
                </div>
            </Group>
        </div>
    );
};

export default ProtectedLayout;

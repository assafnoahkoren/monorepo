import React from 'react';
import GroupAssignment from "../features/group-assignment/GroupAssignment.tsx";

const HomePage: React.FC = () => {
    return (
        <div className="HomePage w-full h-full">
            <GroupAssignment/>
        </div>
    );
};


export const loader = async () => null
export const Component = HomePage;
export default HomePage;
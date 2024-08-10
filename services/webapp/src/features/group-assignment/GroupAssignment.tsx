import React from 'react';
import {Group, rem, Tabs} from "@mantine/core";
import {
    IconArrowsSplit,
    IconBuildingSkyscraper,
    IconHome,
    IconHomeShield,
    IconMessageCircle,
    IconPhoto, IconReportAnalytics,
    IconSettings,
    IconUsers,
    IconUsersGroup
} from "@tabler/icons-react";
import GroupsInputSection from "./GroupsInputSection.tsx";
import ResidencesInputSection from "./ResidencesInputSection.tsx";
import SettingsSection from "./SettingsSection.tsx";

interface GroupAssignmentComponentProps {
}
const iconStyle = { width: rem(20), height: rem(20) };
const GroupAssignment: React.FC<GroupAssignmentComponentProps> = props => {

    return (
        <div className="GroupAssignmentComponent h-full w-full">
            <Tabs variant="outline" defaultValue="groups">
                <Tabs.List className="p-4 pb-0" >
                    <Tabs.Tab value="groups" leftSection={<IconUsersGroup style={iconStyle}/>}>
                        ישובים לפינוי
                    </Tabs.Tab>
                    <Tabs.Tab value="residences" leftSection={<IconBuildingSkyscraper style={iconStyle}/>}>
                        יעדי קליטה
                    </Tabs.Tab>
                    <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle}/>}>
                        הגדרות
                    </Tabs.Tab>
                    <Tabs.Tab value="results" leftSection={<IconReportAnalytics style={iconStyle}/>}>
                        תוצאות
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="groups">
                    <GroupsInputSection />
                </Tabs.Panel>

                <Tabs.Panel value="residences">
                    <ResidencesInputSection />
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    <SettingsSection />
                </Tabs.Panel>

                <Tabs.Panel value="results">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default GroupAssignment;
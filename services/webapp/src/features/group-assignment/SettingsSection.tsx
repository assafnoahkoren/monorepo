import React from 'react';
import {Alert, Button, Group, NumberInput, Text} from "@mantine/core";
import {IconCheck, IconReload} from "@tabler/icons-react";
import rootStore from "../../RootStore.ts";
import {observer} from "mobx-react-lite";

interface SettingsSectionProps {
}

const SettingsSection: React.FC<SettingsSectionProps> = observer(props => {
    return (
        <div className="SettingsSection p-3">
            <Group className="mb-4">
                <NumberInput
                    label="מספר נפשות בחדר"
                    defaultValue={5}
                />
            </Group>
            <Button className="px-20" onClick={() => rootStore.groupAssignmentStore.assignRooms()}>
                <IconReload size={20} stroke={3} className="me-1"/>
                הרץ אלגוריתם
            </Button>
            {rootStore.groupAssignmentStore.duration && (
                <div className="mt-4">
                    <Alert variant="light" color="green" radius="md" title="ריצה הסתיימה" icon={<IconCheck/>}>
                        ריצה הסתיימה תוך
                        &nbsp;
                        <b>
                            {rootStore.groupAssignmentStore.getDuration()}
                        </b>
                        &nbsp;
                        שניות
                    </Alert>
                </div>
            )}
            {rootStore.groupAssignmentStore.duration && <Text className="mt-4" fz="sm">

            </Text>}
        </div>
    );
});

export default SettingsSection;
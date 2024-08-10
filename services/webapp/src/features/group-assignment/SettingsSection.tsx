import React from 'react';
import {Button, Group, NumberInput} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";

interface SettingsSectionProps {
}

const SettingsSection: React.FC<SettingsSectionProps> = props => {
    return (
        <div className="SettingsSection p-3">
            <Group className="mb-4">
                <NumberInput
                    label="מספר נפשות בחדר"
                    defaultValue={5}
                />
            </Group>
            <Button className="px-20">
                <IconReload size={20} stroke={3} className="me-1"/>
                הרץ אלגוריתם
            </Button>
        </div>
    );
};

export default SettingsSection;
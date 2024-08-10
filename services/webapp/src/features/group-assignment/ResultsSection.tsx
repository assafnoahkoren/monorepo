import React from 'react';
import {Group, NumberInput} from "@mantine/core";

interface ResultsSectionProps {
}

const ResultsSection: React.FC<ResultsSectionProps> = props => {
    return (
        <div className="ResultsSection p-4">
            <Group>
                <NumberInput
                    label="Input label"
                    description="Input description"
                    placeholder="Input placeholder"
                />
            </Group>
        </div>
    );
};

export default ResultsSection;
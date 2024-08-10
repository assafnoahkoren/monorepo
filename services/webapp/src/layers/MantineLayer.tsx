import '@mantine/core/styles.css';

import {createTheme, DirectionProvider, MantineProvider} from '@mantine/core';
import React from "react";

const theme = createTheme({
    primaryColor: 'blue',
});

type MantineLayerProps = {
    children: React.ReactNode;
}
const MantineLayer: React.FC<MantineLayerProps> = props => {
    return (
        <DirectionProvider>
            <MantineProvider theme={theme} defaultColorScheme="light">
                {props.children}
            </MantineProvider>
        </DirectionProvider>
    )
}

export default MantineLayer;
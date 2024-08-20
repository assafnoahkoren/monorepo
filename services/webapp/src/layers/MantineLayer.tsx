import '@mantine/core/styles.css';

import {createTheme, DirectionProvider, MantineProvider} from '@mantine/core';
import React from "react";
import { ModalsProvider } from '@mantine/modals';

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
              <ModalsProvider>
                {props.children}
              </ModalsProvider>
            </MantineProvider>
        </DirectionProvider>
    )
}

export default MantineLayer;
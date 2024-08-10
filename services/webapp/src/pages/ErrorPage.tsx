import React from 'react';
import {Anchor, Group, Stack, Text, Title} from "@mantine/core";

const ErrorPage: React.FC = () => {
    return (
        <div className="ErrorPage">
            <Stack align="center">
                <Text fz="200px" fw={900}  c="blue">
                    404
                </Text>

                <Title >מצאת מקום סודי.</Title>
                <Text c="dimmed" size="lg" ta="center" >
                    לצערנו, זו רק דף שגיאה 404. ייתכן שהזנת כתובת שגויה, או שהדף הועבר לכתובת אחרת.
                </Text>
                <Group justify="center">
                    <Anchor
                        variant="text"
                        gradient={{ from: 'pink', to: 'blue' }}
                        fw={500}
                        href="/"
                    >
                        חזרה הביתה
                    </Anchor>
                </Group>
            </Stack>

        </div>
    );
};

export const loader = async () => null
export const Component = ErrorPage;
export default ErrorPage;

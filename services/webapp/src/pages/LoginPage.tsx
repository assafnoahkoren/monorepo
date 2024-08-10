import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Transition
} from "@mantine/core";
import {useEffect, useState} from "react";

const LoginPage = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 400);
    }, []);
    return (
        <Transition
            mounted={mounted}
            transition="fade"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <Container style={styles} size={420} my={40}>
                    <Title ta="center">
                        ברוכים הבאים!
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        עדיין אין לך משתמש?{' '}
                        <Anchor size="sm" component="button">
                            להרשמה לחץ כאן
                        </Anchor>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="אימייל" placeholder="you@mantine.dev" required/>
                        <PasswordInput label="סיסמא" placeholder="123456" required mt="md"/>
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="זכור אותי"/>
                            <Anchor component="button" size="sm">
                                שכחת סיסמא?
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl">
                            התחבר
                        </Button>
                        <Button fullWidth mt="sm" variant="outline">
                            להרשמה לחץ כאן
                        </Button>
                    </Paper>
                </Container>
            )}
        </Transition>
    )
}

export const loader = async () => null
export const Component = LoginPage;
export default LoginPage;
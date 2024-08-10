import { useState } from 'react';
import {Group, Image, Text, Badge} from '@mantine/core';
import {
    IconSettings,
    IconLogout, IconBuildingSkyscraper,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';

const data = [
    { link: '', label: 'שיבוץ למלונות', icon: IconBuildingSkyscraper },
];

export function Sidebar() {
    const [active, setActive] = useState('שיבוץ למלונות');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar + " bg-blue-100 bg-opacity-30 h-full"}>
            <div className={classes.navbarMain}>
                <Group className={classes.header}>
                    <Image src="/alona-icon.png" width={28} height={28} />
                    <Text c="blue" fw={700}>מערכת אלונה</Text>
                    <Badge ms="auto" color="red" size="sm" radius="sm">
                        מבצעי
                    </Badge>
                </Group>
                {links}


            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span>הגדרות</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon + " stroke-red-500 relative left-1"} stroke={1.5} />
                    <span>התנתק</span>
                    <Text ms="auto" fz="xs" opacity={0.3} fw={700}>v0.0.0</Text>
                </a>
            </div>
        </nav>
    );
}
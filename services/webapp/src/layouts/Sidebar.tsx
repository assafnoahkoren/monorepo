import { useState } from 'react';
import {Group, Image, Text, Badge, Stack, Space, Paper, SemiCircleProgress} from '@mantine/core';
import {
    IconSettings,
    IconLogout, IconBuildingSkyscraper,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';
import rootStore from "../RootStore.ts";
import {observer} from "mobx-react-lite";

const data = [
    { link: '', label: 'שיבוץ למלונות', icon: IconBuildingSkyscraper },
];

export const Sidebar = observer(() => {
    const groups = rootStore.groupAssignmentStore.groups || [];
    const numberOfRoomsNeeded = rootStore.groupAssignmentStore.getTotalRoomsNeeded();
    const numberOfRoomsAvailable = rootStore.groupAssignmentStore.getTotalRoomsAvailable();
    const residences = rootStore.groupAssignmentStore.residences || [];
    const assignmentsStatistics = rootStore.groupAssignmentStore.getAssignmentsStatistics();
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

    const assignmentPercentageColor = (assignmentsStatistics?.percentageOfAssignedRooms || 0) > 50 ? 'green' : 'red';

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
                <Space h={14}/>
                <Stack>
                    <Group justify="space-evenly">
                        <Paper radius="md" p="xs" className="bg-slate-200 flex-1 h-24 flex flex-col items-center justify-center">
                            <Text className="opacity-50" fz="h1" fw="700">{groups.length}</Text>
                            <Text fz="xs" className="opacity-40">ישובים</Text>
                        </Paper>
                        <Paper radius="md" p="xs" className="bg-slate-200 flex-[2] h-24 flex flex-col items-center justify-center">
                            <Text className="opacity-50" fz="h1" fw="700">{numberOfRoomsNeeded}</Text>
                            <Text fz="xs" className="opacity-40">חדרים נדרשים</Text>
                        </Paper>
                    </Group>
                    <Group justify="space-evenly">
                        <Paper radius="md" p="xs" className="bg-slate-200 flex-1 h-24 flex flex-col items-center justify-center">
                            <Text className="opacity-50" fz="h1" fw="700">{residences.length}</Text>
                            <Text fz="xs" className="opacity-40">יעדי פינוי</Text>
                        </Paper>
                        <Paper radius="md" p="xs" className="bg-slate-200 flex-[2] h-24 flex flex-col items-center justify-center">
                            <Text className="opacity-50" fz="h1" fw="700">{numberOfRoomsAvailable}</Text>
                            <Text fz="xs" className="opacity-40">חדרים זמינים</Text>
                        </Paper>
                    </Group>
                    <Group justify="space-evenly">
                        <Paper radius="md" p="xs" className="bg-green-100 text-green-500 flex-1 h-24 flex flex-col items-center justify-center">
                            <Text fz="h1" fw="700">{assignmentsStatistics?.numberOfAssignedRooms || 0}</Text>
                            <Text fz="xs" className="opacity-80 text-green-800">חדרים ששובצו</Text>
                        </Paper>
                        <Paper radius="md" p="xs" className="bg-red-100 text-red-500 flex-1 h-24 flex flex-col items-center justify-center">
                            <Text fz="h1" fw="700">{assignmentsStatistics?.numberOfUnassignedRooms || 0}</Text>
                            <Text fz="xs" className="opacity-80 text-red-800">חדרים חסרים</Text>
                        </Paper>
                    </Group>
                    <SemiCircleProgress
                        orientation="up"
                        filledSegmentColor={assignmentPercentageColor}
                        size={260}
                        thickness={30}
                        value={assignmentsStatistics?.percentageOfAssignedRooms || 0}
                        label={
                            <Stack gap={0}>
                                <Text c={assignmentPercentageColor} fz="h1" fw="700">{assignmentsStatistics?.percentageOfAssignedRooms || 0}%</Text>
                                <Text fz="xs">אחוז שיבוץ</Text>
                            </Stack>
                        }
                    />

                </Stack>
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span>הגדרות</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon + " stroke-red-500 relative left-1"} stroke={1.5} />
                    <span>התנתק</span>
                    <Text ms="auto" fz="xs" opacity={0.3} fw={700}>{rootStore.appVersion}</Text>
                </a>
            </div>
        </nav>
    );
});
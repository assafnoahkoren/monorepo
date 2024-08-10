import React, {useState} from 'react';
import {AgGridReact, AgGridReactProps} from 'ag-grid-react';
import {Container, FileInput} from "@mantine/core";
import {IconFile} from "@tabler/icons-react";
import {Group} from "./Types.ts";
import rootStore from "../../RootStore.ts";

type RowDataType = Group;

interface GroupsInputSectionProps {
}

const GroupsInputSection: React.FC<GroupsInputSectionProps> = props => {
        const [rowData, setRowData] = useState<RowDataType[]>([]);

        // Column Definitions: Defines the columns to be displayed.
        const [colDefs, setColDefs] = useState<any>([
            {field: "name", headerName: "שם יישוב"},
            {field: "rooms", headerName: "חדרים"},
        ]);

        const onFileChange = async (file?: File | null) => {
            if (!file) return;

            try {
                const text = await file.text(); // Read the file content as text
                const rowsArray: RowDataType[] = text
                    .trim() // Remove any extra whitespace
                    .split('\n') // Split the text into rows
                    .map(row => {
                        const [name, rooms] = row.split(','); // Split each row into name and rooms
                        return {
                            name: name.trim(),
                            rooms: parseInt(rooms.trim(), 10),
                        };
                    })
                    .filter(row => !isNaN(row.rooms)); // Filter out rows where rooms is NaN


                setRowData(rowsArray);
                rootStore.groupAssignmentStore.groups = rowsArray;
                // Do something with rowsArray if needed
            } catch (error) {
                console.error('Error reading file:', error);
                alert('קריאת קובץ נכשלה');
            }

        }


        return (
            <div className="GroupsInputSecion p-3">
                <Container size="xs" className="pb-4" m={0}>
                    <FileInput
                        label={<><IconFile size={12} className="me-1 relative top-[1px]"/>העלה קובץ ישובים</>}
                        placeholder="לחץ כאן להעלאה"
                        onChange={onFileChange}
                    />
                </Container>
                <div
                    className="ag-theme-quartz" // applying the Data Grid theme
                    style={{height: 500}} // the Data Grid will fill the size of the parent container
                >
                    <AgGridReact
                        noRowsOverlayComponent={() => <div className="bg-blue-100 p-4 mb-auto rounded-xl">לא נמצאו ישובים</div>}
                        enableRtl
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
            </div>
        );
    }
;

export default GroupsInputSection;
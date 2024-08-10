import React, {useState} from 'react';
import {AgGridReact, AgGridReactProps} from 'ag-grid-react';
import {Button, Container, FileInput} from "@mantine/core";
import {IconDownload, IconFile} from "@tabler/icons-react";
import {Group} from "./Types.ts";
import rootStore from "../../RootStore.ts";

type RowDataType = Group;

interface ResultsSectionProps {
}

const ResultsSection: React.FC<ResultsSectionProps> = props => {
        const rowData = rootStore.groupAssignmentStore.getAssignmentsAsRows();

        // Column Definitions: Defines the columns to be displayed.
        const [colDefs, setColDefs] = useState<any>([
            {field: "groupName", headerName: "שם יישוב"},
            {field: "residenceName", headerName: "יעד פינוי"},
            {field: "rooms", headerName: "חדרים"},
        ]);

        return (
            <div className="ResultsSecion p-3">
                <Button className="my-4" onClick={() => rootStore.groupAssignmentStore.downloadAssignmentsAsFile()}>
                    <IconDownload size={16} className="me-1 relative top-[1px]"/>
                    הורד קובץ
                </Button>
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

export default ResultsSection;
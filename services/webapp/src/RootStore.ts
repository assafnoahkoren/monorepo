import {GroupAssignmentStore} from "./features/group-assignment/GroupAssignmentStore.ts";
import {makeAutoObservable} from "mobx";

class RootStore {
    appVersion: string;
    groupAssignmentStore: GroupAssignmentStore;

    constructor() {
        makeAutoObservable(this);
        this.appVersion = import.meta.env.PACKAGE_VERSION;
        this.groupAssignmentStore = new GroupAssignmentStore();
    }
}

export default new RootStore();
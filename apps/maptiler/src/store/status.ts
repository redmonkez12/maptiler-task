import { Status } from "@prisma/client";
import { Store } from "@tanstack/store";

interface StatusStore {
    statusList: Status[];
}

export const statusStore = new Store<StatusStore>({
    statusList: [],
});

export const setStatusList = (statusList: StatusStore["statusList"]) => {
    statusStore.setState((state) => {
        return {
            ...state,
            statusList,
        };
    });
};
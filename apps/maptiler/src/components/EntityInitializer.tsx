"use client";

import { setStatusList } from "@/store/status";
import { Status } from "@prisma/client";
import { PropsWithChildren, useEffect } from "react";

interface Props {
    statusList: Status[];
}

export function EntityInitializer({ statusList, children }: PropsWithChildren<Props>) {
    useEffect(() => {
        setStatusList(statusList);
    }, [statusList]);

    return children;
}
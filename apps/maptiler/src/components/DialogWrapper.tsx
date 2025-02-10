import { CreateEntityDialog } from "./entities/CreateEntityDialog";
import { EditEntityDialog } from "./entities/EditEntityDialog";

export function DialogWrapper() {
    return (
        <>
            <CreateEntityDialog/>
            <EditEntityDialog/>    
        </>
    );
}

import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITask } from "../../../../../../models/interfaces/task.interface";
import { statusColors } from "../../../../../../models/enums/status-colors.enums";
import TaskModal from "./task.modal";
import { useState } from "react";

interface TaskCardProps {
    task: ITask;
    setChangeTrigger: React.Dispatch<React.SetStateAction<boolean>>
    changeTrigger: boolean
}

export default function TaskCard({ task, setChangeTrigger, changeTrigger }: TaskCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="50px"
            height="auto"
            padding="10px 50px"
            bgcolor= {`${statusColors[task.state as keyof typeof statusColors]}.light`}
            mb={'15px'}
        >
            <TaskModal open={open} onClose={() => setOpen(false)} task={task} setChangeTrigger={setChangeTrigger} changeTrigger={changeTrigger}/>
            <Box
                display="flex"
                flexDirection="column"
                
            >
                <Typography
                    variant="h3"
                >
                    {task.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                >
                    {task.spaceName}
                </Typography>
            </Box>
            <IconButton sx={{mr: '15px', fontSize: '30px'}} onClick={() => setOpen(true)}>
                <VisibilityIcon fontSize="inherit" color="primary"/>
            </IconButton>
        </Box>
    );
}

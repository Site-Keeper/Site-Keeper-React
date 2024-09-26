import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@mui/material';
import { ITask } from '../../../../../../models/interfaces/task.interface';
import { ReportStatus } from '../../../../../../models/enums/status.enum';
import { ITopic } from '../../../../../../models/interfaces/topic.interface';
import { IUpdateTaskReq } from '../../../../../../models/services/tasks.interfaces';
import { useEffect, useState } from 'react';
import { IObject, ISpace } from '../../../../../../models/interfaces';
import { SpacesService } from '../../../../../../services/spaces/spaces.service';
import { TasksService } from '../../../../../../services/task/task.service';

interface IFormInput {
    title: string;
    description: string;
    state: ReportStatus;
    spaceId: number; // Cambiado a espacio ID
    object_id: number;
    topic: ITopic; 
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    task?: ITask;
}

export const ModalUpdateFormTask = ({ handleClose, open, task }: IProps) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();
    const [spaces, setSpaces] = useState<ISpace[]>([]);
    const [spaceId, setSpaceId] = useState<number | null>(null);
    const [objects, setObjects] = useState<IObject[]>([]);

    const getSpaces = async () => {
        const spacesRes = await SpacesService.getAll();
        setSpaces(spacesRes);
    };

    useEffect(() => {
        getSpaces();
    }, []);

    useEffect(() => {
        const getObjects = async () => {
            if (spaceId) {
                const selectedSpaceData = spaces.find(space => space.id === spaceId);
                if (selectedSpaceData) {
                    setObjects(selectedSpaceData.objects || []);
                    setValue('object_id', 0); // Reiniciar el objeto seleccionado
                }
            }
        };
        getObjects();
    }, [spaceId, spaces, setValue]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const updatedData: IUpdateTaskReq = {};
        if (task) {
            if (data.title !== task.title) updatedData.title = data.title;
            if (data.description !== task.description) updatedData.description = data.description;
            if (data.state !== task.state) updatedData.state = data.state;
             updatedData.space_id = data.spaceId;
            if (data.object_id !== task.object_id) updatedData.object_id = data.object_id;
        }
        updatedData.id = task?.id;
        await TasksService.update(updatedData);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "500px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    borderRadius: "20px",
                }}
            >
                <Typography variant="h2">{task ? 'Editar Tarea' : 'Crear Tarea'}</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Título"
                        {...register('title', { required: 'Por favor ingresa un título' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                    />

                    <TextField
                        label="Descripción"
                        {...register('description', { required: 'Por favor ingresa una descripción' })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <FormControl fullWidth error={!!errors.state}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            defaultValue={task ? task.state : ReportStatus.PENDING}
                            {...register('state', { required: 'Por favor selecciona un estado' })}
                        >
                            {Object.values(ReportStatus).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.state?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={!!errors.spaceId}>
                        <InputLabel>Espacio</InputLabel>
                        <Select
                            {...register('spaceId', { required: 'Por favor selecciona un espacio' })}
                            onChange={(e) => {
                                setSpaceId(Number(e.target.value));
                            }}
                        >
                            {spaces.map((space) => (
                                <MenuItem key={space.id} value={space.id}>
                                    {space.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.spaceId?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={!!errors.object_id}>
                        <InputLabel>Objeto</InputLabel>
                        <Select
                            {...register('object_id', { required: 'Por favor selecciona un objeto' })}
                            disabled={!objects.length} // Deshabilitar si no hay objetos
                        >
                            {objects.map((object) => (
                                <MenuItem key={object.id} value={object.id}>
                                    {object.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.object_id?.message}</FormHelperText>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ bgcolor: 'secondary.main', color: 'white', width: "200px", height: "40px", alignSelf: "flex-end" }}
                    >
                        {task ? 'Actualizar' : 'Crear'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

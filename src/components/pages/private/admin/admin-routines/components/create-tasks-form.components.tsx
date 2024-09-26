import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IObject, ISpace } from '../../../../../../models/interfaces';
import { SpacesService } from '../../../../../../services/spaces/spaces.service';
import { SelectChangeEvent } from '@mui/material/Select';
import { TasksService } from '../../../../../../services/task/task.service';
import { ICreateTaskReq } from '../../../../../../models/services/tasks.interfaces';

interface IFormInput {
    title: string;
    description: string;
    state: string;
    space_id: number; 
    object_id?: number; 
    topic_id: string; 
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    routine_id: number;
}

const topics = [
    { value: 1, label: 'Maintenance' },
    { value: 2, label: 'Janitorial' },
    { value: 3, label: 'Security' },
    { value: 4, label: 'Other' }
];

export const ModalFormCreateTasks = ({ handleClose, open, routine_id }: IProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
    const [tasks, setTasks] = useState<IFormInput[]>([]);
    const [taskError, setTaskError] = useState<string | null>(null);
    const [spaces, setSpaces] = useState<ISpace[]>([]);
    const [spaceId, setSpaceId] = useState<number | null>(null);
    const [object, setObject] = useState<IObject[]>([]);

    async function getSpaces() {
        const spacesRes = await SpacesService.getAll();
        setSpaces(spacesRes);
    }

    useEffect(() => {
        const getObjects = async () => {
            if (spaceId) {
                const selectedSpaceData = spaces.find(space => space.id === spaceId);
                if (selectedSpaceData) {
                    setObject(selectedSpaceData.objects || []);
                }
            }
        };
    
        getObjects();
    }, [spaceId, spaces]);

    useEffect(() => {
        getSpaces();
    }, []);

    const handleSpaceChange = (event: SelectChangeEvent<number>) => {
        const spaceId = Number(event.target.value);
        setSpaceId(spaceId);
    };

    const onSubmit = async () => {
        console.log(tasks);
        const taskreq: ICreateTaskReq[] = tasks.map((task) => ({
            title: task.title,
            description: task.description,
            state: "PENDING",
            space_id: task.space_id,
            object_id: task.object_id? task.object_id : undefined,
            topic_id: task.topic_id,
            is_deleted: false,
            routine_id: routine_id
        }))
        console.log(taskreq);
        await TasksService.postTask(taskreq);
        console.log('Enviar datos:', taskreq);
        setTaskError(null);
        setTasks([]);
        handleClose();
    };

    const handleAddTask = (data: IFormInput) => {
        // Validar campos al agregar tarea
        if (!data.title || !data.description || !data.space_id || !data.topic_id) {
            setTaskError('Todos los campos son obligatorios excepto el Objeto.');
            return;
        }
        const newTask = { ...data };
        setTasks([...tasks, newTask]);
        reset();
        setTaskError(null);
    };

    const handleDeleteTask = (taskToDelete: IFormInput) => {
        setTasks(tasks.filter(task => task.title !== taskToDelete.title));
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "620px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Typography variant="h2" component="h2">
                    Añadir Tarea
                </Typography>
                <Box>
                    {tasks.length === 0 ? (
                        <Typography variant="subtitle1">No hay tareas agregadas.</Typography>
                    ) : (
                        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {tasks.map((task, index) => (
                                <Chip
                                    key={index}
                                    label={task.title}
                                    onDelete={() => handleDeleteTask(task)}
                                    deleteIcon={<CloseIcon />}
                                    sx={{
                                        color: 'secondary.main',
                                        borderColor: 'secondary.main',
                                        height: 36,
                                        fontSize: 16,
                                        ':hover': { color: 'rgb(80, 65, 200)', borderColor: 'rgb(80, 65, 200)' },
                                        '& .MuiChip-deleteIcon': {
                                            color: 'rgb(107, 92, 255)',
                                            '&:hover': {
                                                color: 'rgb(80, 65, 200)',
                                            },
                                        },
                                    }}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    )}
                </Box>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        label="Título de la Tarea"
                        fullWidth
                        margin="normal"
                        {...register('title', { required: 'Este campo es obligatorio' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Descripción"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        {...register('description', { required: 'Este campo es obligatorio' })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.space_id}>
                        <InputLabel>Espacio</InputLabel>
                        <Select
                            label="Espacio"
                            defaultValue={undefined}
                            {...register('space_id', { required: 'Este campo es obligatorio' })}
                            onChange={handleSpaceChange}
                        >
                            {spaces.map((space) => (
                                <MenuItem key={space.id} value={space.id}>
                                    {space.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.space_id?.message}</FormHelperText>
                    </FormControl>
                    {spaceId && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Objeto (Opcional)</InputLabel>
                            <Select
                                label="Objeto (Opcional)"
                                defaultValue={undefined}
                                {...register('object_id')}
                            >
                                {object.map((objectItem) => (
                                    <MenuItem key={objectItem.id} value={objectItem.id}>
                                        {objectItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <FormControl fullWidth margin="normal" error={!!errors.topic_id}>
                        <InputLabel>Tema</InputLabel>
                        <Select
                            label="Tema"
                            defaultValue={undefined}
                            {...register('topic_id', { required: 'Este campo es obligatorio' })}
                        >
                            {topics.map((topic) => (
                                <MenuItem key={topic.value} value={topic.value}>
                                    {topic.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.topic_id?.message}</FormHelperText>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            type="button" // Cambia a type="button" para evitar la validación
                            variant="contained"
                            sx={{ bgcolor: 'secondary.main', color: 'white', width: "200px", height: "40px" }}
                            onClick={handleSubmit(handleAddTask)} // Asegúrate de usar handleSubmit aquí
                        >
                            Agregar Tarea
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: 'secondary.main', color: 'white', width: "200px", height: "40px" }}
                            onClick={onSubmit}
                        >
                            Enviar
                        </Button>
                    </Box>
                    {taskError && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {taskError}
                        </Typography>
                    )}
                </form>
            </Box>
        </Modal>
    );
};

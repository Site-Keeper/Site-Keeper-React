import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Box, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUser } from '../../../../../../models/interfaces';
import { USersService } from '../../../../../../services/users/users.service';
import { personnelTypeTranslate } from '../../../../../../models/enums/perssonelType.enum';
import { IRoutine } from '../../../../../../models/interfaces/routines.interface';
import { RoutinesService } from '../../../../../../services/routines/routines.service';
import { IUpdateRoutineReq } from '../../../../../../models/services/rotines.interfaces';

// Definición del tipo de los valores del formulario
interface IFormInput {
    name?: string;
    start_time?: string;
    end_time?: string;
    days?: string[];
    assigned_to?: number;
    personnelType?: personnelTypeTranslate;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
    routine: IRoutine;
}

const daysOfWeek = [
    { value: 'Monday', label: 'Lunes' },
    { value: 'Tuesday', label: 'Martes' },
    { value: 'Wednesday', label: 'Miércoles' },
    { value: 'Thursday', label: 'Jueves' },
    { value: 'Friday', label: 'Viernes' }
];

export const ModalFormEditRoutines = ({ handleClose, open, routine }: IProps) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>();

    const [personnel, setPersonnel] = useState<IUser[]>([]);

    async function getPersonnel() {
        const user = await USersService.getAll();
        setPersonnel(user.data);
    }

    useEffect(() => {
        getPersonnel();
    }, []);

    // Observa los días seleccionados
    const selectedDays = watch('days', routine.days || []);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const updatedData: IUpdateRoutineReq = {
            name: data.name || routine.name,
            start_time: data.start_time ? new Date(`1970-01-01T${data.start_time}:00`) : undefined,
            end_time: data.end_time ? new Date(`1970-01-01T${data.end_time}:00`) : undefined,
            days: selectedDays ? selectedDays : undefined,
            assigned_to: data.assigned_to !== undefined ? data.assigned_to : undefined,
        };
        await RoutinesService.update(updatedData, routine.id);

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
                    width: "620px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    borderRadius: "20px",
                }}
            >
                <Typography variant="h2">Editar Rutina</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nombre de la Rutina"
                        defaultValue={routine.name}
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                    />

                    <TextField
                        label="Hora de Inicio"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        defaultValue={routine.start_time} 
                        {...register('start_time')}
                        error={!!errors.start_time}
                        helperText={errors.start_time?.message}
                        fullWidth
                        sx={{
                            '& input[type="time"]::-webkit-calendar-picker-indicator': {
                                display: 'none',
                            }
                        }}
                    />

                    <TextField
                        label="Hora de Fin"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        defaultValue={routine.end_time} 
                        {...register('end_time')}
                        error={!!errors.end_time}
                        helperText={errors.end_time?.message}
                        fullWidth
                        sx={{
                            '& input[type="time"]::-webkit-calendar-picker-indicator': {
                                display: 'none',
                            }
                        }}
                    />

                    <FormControl component="fieldset" error={!!errors.days}>
                        <Typography>Días de la Semana</Typography>
                        <FormGroup row>
                            {daysOfWeek.map((day) => (
                                <FormControlLabel
                                    key={day.value}
                                    control={
                                        <Checkbox
                                            value={day.value}
                                            checked={selectedDays?.includes(day.value)} // Verifica si el día está seleccionado
                                            {...register('days')}
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: 'secondary.main',
                                                },
                                            }}
                                        />
                                    }
                                    label={day.label}
                                />
                            ))}
                        </FormGroup>
                        {selectedDays?.length === 0 && (
                            <FormHelperText error>Por favor selecciona al menos un día</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={!!errors.assigned_to}>
                        <InputLabel>Asignado a</InputLabel>
                        <Select
                            label="Asignado a"
                            defaultValue={routine.assigned_to}
                            {...register('assigned_to')}
                            fullWidth
                        >
                            {personnel.map((personal) => (
                                <MenuItem key={personal.id} value={personal.id}>
                                    {personal.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.assigned_to?.message}</FormHelperText>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ bgcolor: 'secondary.main', color: 'white', width: "200px", height: "40px", alignSelf: "flex-end" }}
                    >
                        Actualizar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

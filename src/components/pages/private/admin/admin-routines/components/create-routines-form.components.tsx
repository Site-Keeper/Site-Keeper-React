import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Box, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUser } from '../../../../../../models/interfaces';
import { USersService } from '../../../../../../services/users/users.service';
import { ICreateRoutineReq } from '../../../../../../models/services/rotines.interfaces';
import { RoutinesService } from '../../../../../../services/routines/routines.service';
import { Navigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../../../../models/routes/routes.model';
import { personnelTypeTranslate } from '../../../../../../models/enums/perssonelType.enum';


// Definición del tipo de los valores del formulario
interface IFormInput {
    name: string;
    start_time: string;
    end_time: string;
    days: string[];
    assigned_to: number;
    personnelType: personnelTypeTranslate;
}

interface IProps {
    handleClose: () => void;
    open: boolean;
}

const daysOfWeek = [
    { value: 'Monday', label: 'Lunes' },
    { value: 'Tuesday', label: 'Martes' },
    { value: 'Wednesday', label: 'Miércoles' },
    { value: 'Thursday', label: 'Jueves' },
    { value: 'Friday', label: 'Viernes' }
];

export const ModalFormCreateRoutines = ({ handleClose, open }: IProps) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInput>();
    const [ personnel, setPersonnel ] = useState<IUser[]>([]);

    async function getPersonnel() {
        const user = await USersService.getAll();
        setPersonnel(user.data);
    }

    useEffect(() => {
        getPersonnel()
    }, [])

    // Observa los días seleccionados
    const selectedDays = watch('days', []);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (selectedDays.length === 0) {
            alert("Por favor selecciona al menos un día.");
            return;
        }

        const startTime = new Date();
        const [startHours, startMinutes] = data.start_time.split(':');
        startTime.setHours(Number(startHours), Number(startMinutes));

        const endTime = new Date();
        const [endHours, endMinutes] = data.end_time.split(':');
        endTime.setHours(Number(endHours), Number(endMinutes));

        const datareq: ICreateRoutineReq = {
            name: data.name,
            start_time: startTime,
            end_time: endTime,
            days: selectedDays,
            assigned_to: data.assigned_to,
        }
        await RoutinesService.create(datareq);
        <Navigate replace to={PrivateRoutes.ADMIN_RUTINES} />
    };

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

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
                <Typography variant="h2">Crear Rutina</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nombre de la Rutina"
                        {...register('name', { required: 'Por favor ingresa un nombre' })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                    />

                    <TextField
                        label="Hora de Inicio"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        {...register('start_time', { required: 'Por favor ingresa la hora de inicio' })}
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
                        {...register('end_time', { required: 'Por favor ingresa la hora de fin' })}
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
                        {selectedDays.length === 0 && (
                            <FormHelperText error>Por favor selecciona al menos un día</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={!!errors.personnelType}>
                        <InputLabel>Tipo de Reserva</InputLabel>
                        <Select
                            label="Tipo de Reserva"
                            defaultValue=""
                            {...register('personnelType', { required: 'Por favor selecciona un tipo de reserva' })}
                            fullWidth
                        >
                            {Object.entries(personnelTypeTranslate).map(([key, value]) => (
                                <MenuItem key={key} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.personnelType?.message}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={!!errors.assigned_to}>
                        <InputLabel>Asignado a</InputLabel>
                        <Select
                            label="Asignado a"
                            defaultValue=""
                            {...register('assigned_to', { required: 'Por favor selecciona a quién asignar' })}
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
                        Enviar
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

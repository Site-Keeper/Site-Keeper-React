

export interface IRoutine{
    id: number;
    name: string;
    start_time: Date;
    end_time: Date;
    days: string[];
    assignedTo : string
}
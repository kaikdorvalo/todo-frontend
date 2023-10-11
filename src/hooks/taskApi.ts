import axios from 'axios';
import type { TaskGetApiDto } from '../dto/TaskGetApiDto';
import type { TaskSendApiDto } from '../dto/TaskSendApiDto';
import type { UpdateTitleDto } from '../dto/UpdateTitleDto';
import type { AddSubTaskDto } from '../dto/AddSubTaskDto';
import type { UuidDto } from '../dto/uuidDto';
import type { SubTaskGetApiDto } from '../dto/SubTaskGetApiDto';

const api = axios.create({
    baseURL: "http://localhost:8000/",
});

export const taskApi = () => ({
    getTasks: async (): Promise<TaskGetApiDto[]>  => {
        return await api.get<TaskGetApiDto[]>('task/findall').then(response => response.data);
    },

    createNewTask: async (task: TaskSendApiDto): Promise<TaskGetApiDto> => {
        let res = await api.post('task/create', task);
        return res.data;
    },

    deleteSubTasks: async (substasksId: String[]): Promise<boolean> => {
        let res = await api.post('task/removesubtasks', substasksId);
        return res.data;
    },

    addSubTasks: async (subTasks: AddSubTaskDto[]): Promise<SubTaskGetApiDto[]> => {
        let res = await api.post('task/addsubtask', subTasks);
        return res.data;
    },

    updateTitle: async (task: UpdateTitleDto): Promise<boolean> => {
        let res = await api.post('task/updatetitle', task);
        return res.data;
    },

    deleteTask: async (taskId: UuidDto): Promise<boolean> => {
        let res = await api.post('task/deletetask', taskId);
        return res.data;
    }

})
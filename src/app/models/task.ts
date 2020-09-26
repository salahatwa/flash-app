
export interface Task {
    content?: string;
    date?: string;
    enabled?: boolean;
    error?: boolean;
    executed?: boolean;
    id?: number;
    img?: string;
    latitude?: number;
    longitude?: number;
    providers?: Array<any>;
    scheduled?: boolean;
    scheduleType?: Task.ScheduleTypeEnum;
    time?: string;
    timezoneOffset?: number;
}

export namespace Task {
    export type ScheduleTypeEnum = 'POST' | 'DATETIME' | 'DATERANGE' | 'MULTIPLE';
    export const ScheduleTypeEnum = {
        POST: 'SELF' as ScheduleTypeEnum,
        DATETIME: 'DATETIME' as ScheduleTypeEnum,
        DATERANGE: 'DATERANGE' as ScheduleTypeEnum,
        MULTIPLE: 'MULTIPLE' as ScheduleTypeEnum,
    };
}

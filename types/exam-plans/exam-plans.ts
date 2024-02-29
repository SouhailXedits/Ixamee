export interface examPlanOutput {
    id: number,
    name: string, 
    color: true,
    description: string,
    start: Date,
    end: Date,
    subject: {
        id: number,
        name: string,
    } | null,
    classes: {
        id: number,
        name: string,
    },
    studentVisibility: boolean,
}


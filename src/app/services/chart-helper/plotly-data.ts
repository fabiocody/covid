export interface PlotlyData {
    data: {
        x: number[] | Date[];
        y: number[];
        name?: string;
        showLegend?: boolean;
        type?: string;
        line?: {shape: string};
        mode?: string;
    }[];
    layout: {
        title: string;
        xaxis?: PlotlyDataAxis;
        yaxis?: PlotlyDataAxis;
    };
}

export interface PlotlyDataAxis {
    title?: string;
    range?: number[] | Date[];
}

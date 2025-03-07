export interface IEditingFigureValues {
    fill: string
    stroke: string
    borderRadius: string
    width: string
    height: string
}

export interface IFigure extends IEditingFigureValues {
    id: string
    type: string
    x: number
    y: number
    html: string
    text: string
}

export const make2DArray = (rows: number, cols: number) =>
    Array.from({length: rows},
        () => Array.from({length: cols},
            () => 0));

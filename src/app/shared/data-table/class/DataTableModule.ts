import {IDataTableRow} from "@app/models/IDataTable";

export abstract class DataTableModule {
    /**
     * Converts an arrangement of generic objects a non -format of data table.
     * @param dataSource An object arrangement.
     * @returns A two-dimensional matrix with the IDataTableRow structure.
     */
    convertToRowDataTable<T extends object>(dataSource: T[]): IDataTableRow[][] {
        return dataSource.map((row) => {

            return Object.entries(row).map(([name, value]) => {
                return {value, name} as IDataTableRow
            });
        })
    }
}

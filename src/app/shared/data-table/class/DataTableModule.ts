import {IDataTableColumns, IDataTableRow} from "@app/shared/data-table/models/IDataTable";

export abstract class DataTableModule {
    abstract readonly _columnsDataTable: IDataTableColumns[];

    /**
     * Converts an arrangement of generic objects a non -format of data table.
     * @param dataSource An object arrangement.
     * @returns A two-dimensional matrix with the IDataTableRow structure.
     */
    convertToRowDataTable<T extends object>(dataSource: T[]): IDataTableRow[][] {
        return dataSource.map((row) => {

            return Object.entries(row)
                .map(([alias, value]) => {
                    const column = this._columnsDataTable.find((col) => col.alias === alias);
                    return {value, alias, order: column?.order, item: row} as IDataTableRow;
                })
                .filter(({alias}) => this._columnsDataTable.some((col) => col.alias === alias))
                .sort((a, b) => a.order - b.order);
        });
    }
}

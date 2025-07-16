import {IDataTable, IDataTableColumns, IDataTableRow} from "@app/shared/data-table/models/IDataTable";

export class DataTable implements IDataTable{
    rows: IDataTableRow[][];
    columns: IDataTableColumns[]
    total!: number;
    perPage!: number;

    constructor() {
        this.rows = [];
        this.columns =[];
    }
}

export class DataTableBuilder {
    dataTable: DataTable;

    constructor() {
        this.dataTable = new DataTable();
    }

    setRows(rows: IDataTableRow[][]): this {
        this.dataTable.rows = rows;
        return this;
    }

    setColumns(columns: IDataTableColumns[]): this {
        this.dataTable.columns = columns;
        return this;
    }

    setTotal(total: number): this {
        this.dataTable.total = total;
        return this;
    }

    setPerPage(perPage: number): this {
        this.dataTable.perPage = perPage;
        return this;
    }

    build(): DataTable {
        return this.dataTable;
    }
}

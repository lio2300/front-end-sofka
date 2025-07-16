import {DataTableTemplateDirective} from "@app/directives/data-table-template/data-table-template.directive";

export interface IDataTable {
    rows: IDataTableRow[][];
    columns: IDataTableColumns[]
    total: number;
    perPage: number;
}

export type IDataTableColumns = Omit<IDataTableRow, "value"> & {name: string;};

export interface IDataTableRow {
    alias: string;
    value: string;
    overwrite_label?: DataTableTemplateDirective;
    overwrite_value?: DataTableTemplateDirective;
    order: number;
}

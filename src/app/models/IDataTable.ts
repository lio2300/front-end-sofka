import {DataTableTemplateDirective} from "@app/directives/data-table-template/data-table-template.directive";

export interface IDataTable {
    rows: IDataTableRow[][];
    columns: IDataTableColumns[]
    total: number;
    perPage: number;
}

export type IDataTableColumns = Omit<IDataTableRow, "alias"> & { icon: string };

export interface IDataTableRow {
    name: string;
    alias: string;
    value: string;
    overwrite_label?: DataTableTemplateDirective;
    overwrite_value?: DataTableTemplateDirective;
    order: number;
}

import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    OnChanges,
    QueryList,
    SimpleChanges
} from "@angular/core";
import {DataTableTemplateDirective} from "@app/directives/data-table-template/data-table-template.directive";
import {IDataTable, IDataTableColumns, IDataTableRow} from "@app/shared/data-table/models/IDataTable";
import {DataTableBuilder} from "@app/shared/data-table/class/DataTable";

@Component({
    selector: "app-data-table",
    standalone: false,
    templateUrl: "./data-table.component.html",
    styleUrl: "./data-table.component.scss"
})
export class DataTableComponent implements AfterContentInit, OnChanges {
    currentPerPage: number = 5;
    totalRows!: number;

    @Input() dataSource: IDataTable = new DataTableBuilder().build();
    @Input() loadingData: boolean = false;

    @ContentChildren(DataTableTemplateDirective) contentTemplates!: QueryList<DataTableTemplateDirective>;

    overwriteColumns: DataTableTemplateDirective[] = [];
    overwriteLabels: DataTableTemplateDirective[] = [];
    actionsTemplate: DataTableTemplateDirective | undefined;

    rowsSource: IDataTableRow[][] = [];

    ngAfterContentInit(): void {
        this.actionsTemplate = this.contentTemplates.find(
            value => value.type === "action"
        );

        this.overwriteColumns = this.contentTemplates.filter(
            value => value.type === "column"
        );

        this.overwriteLabels = this.contentTemplates.filter(
            value => value.type === "label"
        );
        this.loadCustomColumns();
    }

    ngOnChanges({dataSource}: SimpleChanges): void {
        if (!dataSource) {
            return;
        }
        this.loadCustomColumns();
    }

    /**
     * @description
     * Load custom columns and templates.
     * It orders columns by order property, then maps over the columns to add
     * the overwrite_label property to each column.
     * Then it maps over the rows to add the overwrite_value property to each row.
     * Finally, it adds the actions column if the actionsTemplate is defined.
     * @returns {void}
     */
    loadCustomColumns(): void {
        this.totalRows = this.dataSource.rows?.length ?? 0;

        this.dataSource = {
            ...this.dataSource,
            rows: this.dataSource.rows,
            columns: this.orderColumns<IDataTableColumns>(this.dataSource.columns)
                .map((column) => {
                    return {
                        ...column,
                        overwrite_label: this.overwriteLabels.find(
                            value => value.name === column.alias
                        ),
                    };
                }),
        };

        this.rowsSource = this.dataSource.rows.map((row) => {
            const newColumns: IDataTableRow[] = row.map((rowValue) => ({
                ...rowValue,
                overwrite_value: this.overwriteColumns.find(
                    value => value.name === rowValue.alias
                ),
            }));

            if (this.actionsTemplate) {
                const actionsColumn: IDataTableRow = {
                    order: newColumns.length,
                    value: "",
                    alias: "actions",
                    overwrite_value: this.actionsTemplate,
                    item: row[0].item,
                };

                newColumns.push(actionsColumn);
            }

            return newColumns;
        });
    }

    /**
     * Orders an array of  objects by the order property.
     * @param obArray An array of objects with an order property
     * @returns The sorted array
     */
    orderColumns<T extends { order: number }>(obArray: T[]): T[] {
        return obArray.sort((a, b) => a.order - b.order);
    }

    /**
     * Handles the change event on the per page select element.
     * @param event The change event
     * @description
     * Gets the selected value, reloads the custom columns and then
     * splices the rowsSource array to show the desired number of rows.
     * @returns {void}
     */
    changePerPAge(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.loadCustomColumns();

        this.rowsSource.splice(+value, this.rowsSource.length);
    }
}

import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges} from "@angular/core";
import {DataTableTemplateDirective} from "@app/directives/data-table-template/data-table-template.directive";
import {IDataTable, IDataTableColumns, IDataTableRow} from "@app/models/IDataTable";

@Component({
    selector: "app-data-table",
    standalone: false,
    templateUrl: "./data-table.component.html",
    styleUrl: "./data-table.component.scss"
})
export class DataTableComponent implements AfterContentInit, OnChanges {
    @Input() dataSource!: IDataTable;

    @ContentChildren(DataTableTemplateDirective) contentTemplates!: QueryList<DataTableTemplateDirective>;

    overwriteColumns: DataTableTemplateDirective[] = [];
    overwriteLabels: DataTableTemplateDirective[] = [];
    actionsTemplate: DataTableTemplateDirective | undefined = undefined;

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
    }

    ngOnChanges({dataSource}: SimpleChanges): void {
        if (!dataSource) {
            return;
        }

        this.loadColumnsCustom();
    }

    loadColumnsCustom(): void {
        this.dataSource = {
            ...this.dataSource,
            rows: this.dataSource.rows,
            columns: this.orderColumns<IDataTableColumns>(this.dataSource.columns),
        };

        this.rowsSource = this.dataSource.rows.map((row) =>
            row.map((rowValue) => ({
                ...rowValue,
                overwrite_label: this.overwriteLabels.find(
                    value => value.name === rowValue.name
                ),
                overwrite_value: this.overwriteColumns.find(
                    value => value.name === rowValue.name
                ),
            })));
    }

    orderColumns<T extends { order: number }>(obArray: T[]): T[] {
        return obArray.sort((a, b) => a.order - b.order);
    }
}

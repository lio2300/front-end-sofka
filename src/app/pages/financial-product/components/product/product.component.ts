import {Component, inject, OnInit} from "@angular/core";
import {IDataTable, IDataTableColumns} from "@app/shared/data-table/models/IDataTable";
import {DataTableBuilder} from "@app/shared/data-table/class/DataTable";
import {HttpProductService} from "@app/services/financial-product/http-product.service";
import {IFinancialProducts} from "@app/models/IFinancialProducts";
import {DataTableModule} from "@app/shared/data-table/class/DataTableModule";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
    selector: "app-product",
    standalone: false,
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss"
})
export class ProductComponent extends DataTableModule implements OnInit {
    private readonly _financialProductsService = inject(HttpProductService);
    private readonly _fb = inject(FormBuilder);
    formSearch: FormGroup = this._fb.group({
        searchText: new FormControl(null),
    });

    protected dataSource: IDataTable = new DataTableBuilder().build();
    readonly _columnsDataTable: IDataTableColumns[] = [
        {
            name: "Logo",
            alias: "logo",
            order: 1
        },
        {
            name: "Nombre del producto",
            alias: "name",
            order: 2
        },
        {
            name: "Descripción",
            alias: "description",
            order: 3
        },
        {
            name: "Fecha de liberación",
            alias: "date_release",
            order: 4
        },
        {
            name: "Fecha de restructuración",
            alias: "date_revision",
            order: 5
        },
        {
            name: "",
            alias: "actions",
            order: 6
        }
    ];

    constructor() {
        super();
        this.dataSource = new DataTableBuilder()
            .setColumns(this._columnsDataTable)
            .build();
    }

    ngOnInit() {
        this.fetchDataTable();
        this.listenChangeValue();
    }

    fetchDataTable(): void {
        this._financialProductsService.retrieveProducts(this.formSearch.get("searchText")!.value).subscribe({
            next: data => {
                this.dataSource = new DataTableBuilder()
                    .setRows(this.convertToRowDataTable<IFinancialProducts>(data))
                    .setColumns(this._columnsDataTable)
                    .build();
            }
        });
    }

    listenChangeValue(): void {
        this.formSearch.get("searchText")?.valueChanges
            .pipe(debounceTime(1000))
            .subscribe(() => {
                this.fetchDataTable();
            });
    }

    addErrorClass(event: Event, defaultImage: HTMLDivElement): void {
        (event.target as HTMLImageElement).classList.add("d-none");
        defaultImage.classList.remove("d-none");
    }
}

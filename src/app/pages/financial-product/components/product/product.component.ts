import {Component, inject, OnInit} from "@angular/core";
import {IDataTable, IDataTableColumns, IDataTableRow} from "@app/models/IDataTable";
import {DataTableBuilder} from "@app/shared/data-table/class/DataTable";
import {HttpProductService} from "@app/services/financial-product/http-product.service";
import {IFinancialProducts} from "@app/models/IFinancialProducts";
import {DataTableModule} from "@app/shared/data-table/class/DataTableModule";

@Component({
  selector: "app-product",
  standalone: false,
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss"
})
export class ProductComponent extends DataTableModule implements OnInit {
  private readonly _financialProductsService = inject(HttpProductService)

  protected readonly dataSource!: IDataTable;
  private readonly _columnsDataTable: IDataTableColumns[] = [
    {
      name: "Id",
      value: "",
      icon: "",
      order: 0
    },
    {
      name: "Name",
      value: "",
      icon: "",
      order: 1
    },
    {
      name: "Description",
      value: "",
      icon: "",
      order: 2
    },
    {
      name: "Logo",
      value: "",
      icon: "",
      order: 3
    },
    {
      name: "Date release",
      value: "",
      icon: "",
      order: 4
    },
    {
      name: "Date revision",
      value: "",
      icon: "",
      order: 5
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
  }

  fetchDataTable(): void {
    this._financialProductsService.retrieveProducts().subscribe({
      next: data => {
        this.dataSource.rows = this.convertToRowDataTable<IFinancialProducts>(data);
      }
    })
  }
}

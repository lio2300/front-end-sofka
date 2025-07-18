import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { IDataTable } from '@app/shared/data-table/models/IDataTable';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { DataTableBuilder } from '@app/shared/data-table/class/DataTable';
import { By } from '@angular/platform-browser';
import { PipesModule } from "@app/pipes/pipes.module";

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  const mockDataSource: IDataTable = new DataTableBuilder()
      .setColumns([
        { name: 'ID', alias: 'id', order: 1 },
        { name: 'Nombre', alias: 'name', order: 2 }
      ])
      .setRows([
        [
          { alias: 'id', value: '1', order: 1, item: { id: 1 } },
          { alias: 'name', value: 'Juan', order: 2, item: { id: 1 } }
        ],
        [
          { alias: 'id', value: '2', order: 1, item: { id: 2 } },
          { alias: 'name', value: 'Maria', order: 2, item: { id: 2 } }
        ]
      ])
      .build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [PipesModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.dataSource = mockDataSource;
    fixture.detectChanges();
  });

  it('should be created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly calculate total rows', () => {
    component.loadCustomColumns();
    expect(component.totalRows).toBe(2);
    expect(component.rowsSource.length).toBe(2);
  });

  it('should render the expected rows', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should apply overwrite_label and overwrite_value when templates exist', () => {
    const mockTemplate = {
      name: 'id',
      type: 'label',
      templateRef: {} as any
    };

    component.overwriteLabels = [mockTemplate as any];
    component.overwriteColumns = [mockTemplate as any];
    component.loadCustomColumns();

    const column = component.dataSource.columns.find(col => col.alias === 'id');
    expect(column?.overwrite_label).toBeDefined();

    const firstRow = component.rowsSource[0][0];
    expect(firstRow?.overwrite_value).toBeDefined();
  });

  it('should update dataSource in ngOnChanges', () => {
    const newSource = { ...mockDataSource };
    newSource.rows.push([
      { alias: 'id', value: '3', order: 1, item: { id: 3 } },
      { alias: 'name', value: 'Pedro', order: 2, item: { id: 3 } }
    ]);

    component.ngOnChanges({
      dataSource: new SimpleChange(mockDataSource, newSource, false)
    });

    expect(component.totalRows).toBe(3);
    expect(component.rowsSource.length).toBe(3);
  });

  it('should slice the rows when perPage changes', () => {
    component.loadCustomColumns();
    const event = {
      target: { value: '1' }
    } as unknown as Event;

    component.changePerPAge(event);

    expect(component.rowsSource.length).toBe(1);
  });
});

import {IFinancialProducts} from "@app/models/IFinancialProducts";

export class FinancialProduct implements IFinancialProducts{
    id!: string;
    name!: string;
    description!: string;
    logo!: string;
    date_release!: string;
    date_revision!: string;
}

export class FinancialProductsBuilder {
    financialProduct: FinancialProduct;

    constructor() {
        this.financialProduct = new FinancialProduct();
    }
    setId(value: string): this {
        this.financialProduct.id = value;
        return this;
    }

    setName(value: string): this {
        this.financialProduct.name = value;
        return this;
    }

    setDescription(value: string): this {
        this.financialProduct.description = value;
        return this;
    }

    setLogo(value: string): this {
        this.financialProduct.logo = value;
        return this;
    }

    setDateRelease(value: string): this {
        this.financialProduct.date_release = value;
        return this;
    }

    setDateRevision(value: string): this {
        this.financialProduct.date_revision = value;
        return this;
    }

    build(): FinancialProduct {
        return this.financialProduct;
    }
}

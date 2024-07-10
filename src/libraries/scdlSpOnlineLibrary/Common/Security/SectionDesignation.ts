import { IUnitDesignation } from "./IUnitDesignation";

export class SectionDesignation implements IUnitDesignation{

    constructor(private address : string) {

    }

    GetAddress(): string {
        return this.address;
    }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableResp = void 0;
var DataTableResp = /** @class */ (function () {
    function DataTableResp(data, total, filtered, page) {
        this.data = data;
        this.recordsFiltered = filtered;
        this.recordsTotal = total;
        this.page = page;
        this.pageNumber = Math.round(total / filtered);
    }
    return DataTableResp;
}());
exports.DataTableResp = DataTableResp;

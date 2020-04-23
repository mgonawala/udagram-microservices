"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// Retrieve list of all items in the Catalogue
router.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(200).send('OK');
}));
// Retrieve a Product Item by Id
router.get('/{id}', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { id } = request.params;
    response.status(200).send('OK');
}));
// Retrieve a Product Item by Id
router.patch('/{id}', (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(200).send('OK');
}));
exports.ProductRouter = router;
//# sourceMappingURL=product.router.js.map
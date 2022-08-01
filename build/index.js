"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
let cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.get("https://jsonplaceholder.typicode.com/posts")
        .then(response => res.send((response.data)));
}));
app.get("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reqBody = req.body;
    yield axios_1.default.get("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(response => res.send((response.data)));
    //  await axios.put("https://jsonplaceholder.typicode.com/posts/" + id)
    // .then(response => res.send(console.log(reqBody)))
}));
app.listen("4678", () => {
    console.log("SERVER ON 4678");
});

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mathExam, englishExam;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.exam.create({
                        data: {
                            title: 'Mathematics Proficiency Test',
                            description: 'Comprehensive exam covering algebra, geometry, and calculus.',
                            price: 2000,
                            duration: 120,
                            questions: {
                                create: [
                                    {
                                        text: 'What is the value of π (pi) to two decimal places?',
                                        options: ['3.14', '3.16', '3.12', '3.18'],
                                        correctAnswer: 0,
                                    },
                                    {
                                        text: 'Solve for x: 2x + 5 = 13',
                                        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
                                        correctAnswer: 1,
                                    },
                                ],
                            },
                        },
                    })];
                case 1:
                    mathExam = _a.sent();
                    return [4 /*yield*/, prisma.exam.create({
                            data: {
                                title: 'English Language Assessment',
                                description: 'Evaluate your English language proficiency.',
                                price: 1600,
                                duration: 90,
                                questions: {
                                    create: [
                                        {
                                            text: 'Which of the following is a correct sentence?',
                                            options: [
                                                'The cat is sleeping on the couch.',
                                                'The cat sleeping on the couch.',
                                                'The cat be sleeping on the couch.',
                                                'The cat sleeps on the couch is.',
                                            ],
                                            correctAnswer: 0,
                                        },
                                        {
                                            text: 'What is the plural form of "child"?',
                                            options: ['childs', 'childen', 'children', 'childres'],
                                            correctAnswer: 2,
                                        },
                                    ],
                                },
                            },
                        })];
                case 2:
                    englishExam = _a.sent();
                    console.log('Seed data created successfully');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

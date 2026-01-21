import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// Arranca MSW antes de todos los tests
beforeAll(() => server.listen());

// Limpia handlers después de cada test
afterEach(() => server.resetHandlers());

// Apaga MSW al final
afterAll(() => server.close());

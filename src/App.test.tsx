import { renderApp } from "./test/test-utils";
import { test } from "vitest";
import { App } from "./App";

test("app renders without crashing", () => {
  renderApp(<App />);
});
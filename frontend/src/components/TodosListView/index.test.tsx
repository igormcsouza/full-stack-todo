import React from "react";
import { render } from "@testing-library/react";
import TodosListView from "./index";

it("render Main Title", () => {
  render(<TodosListView />);
});

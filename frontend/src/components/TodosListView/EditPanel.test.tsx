import React, { useState } from "react";
import { render } from "@testing-library/react";
import EditPanel from "./EditPanel";

it("render Main Title", () => {
  render(
    <EditPanel
      task={{ id: 0, task: "Do the Dishes", checked: false }}
      open={true}
      onClose={() => false}
    />
  );
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "@/App";

describe("App routing", () => {
  it("renders the home page for / instead of falling back to not found", () => {
    window.history.pushState(null, "", "/");

    render(<App />);

    expect(screen.getByRole("heading", { name: /control center of engineering excellence/i })).toBeInTheDocument();
  });
});

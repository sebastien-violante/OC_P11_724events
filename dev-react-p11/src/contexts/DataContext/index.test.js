import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

describe("DataContext", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const Component = () => {
    const { data, error } = useData();

    return (
      <div>
        <span>{data?.result}</span>
        <span>{error}</span>
      </div>
    );
  };

  describe("when data is successfully retrieved", () => {
    it("displays the retrieved data", async () => {
      jest.spyOn(api, "loadData").mockResolvedValue({
        result: "ok",
      });

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      expect(await screen.findByText("ok")).toBeInTheDocument();
    });

    it("does not display an error", async () => {
      jest.spyOn(api, "loadData").mockResolvedValue({
        result: "ok",
      });

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      await screen.findByText("ok");

      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    it("calls api.loadData", async () => {
      const loadData = jest
        .spyOn(api, "loadData")
        .mockResolvedValue({ result: "ok" });

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      await screen.findByText("ok");

      expect(loadData).toHaveBeenCalledTimes(1);
    });
  });

  describe("when data retrieval fails", () => {
    it("exposes the error through useData", async () => {
      jest
        .spyOn(api, "loadData")
        .mockRejectedValue("error on calling events");

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      expect(
        await screen.findByText("error on calling events")
      ).toBeInTheDocument();
    });

    it("does not display data", async () => {
      jest
        .spyOn(api, "loadData")
        .mockRejectedValue("error on calling events");

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      await screen.findByText("error on calling events");

      expect(screen.queryByText("ok")).not.toBeInTheDocument();
    });
  });

  describe("api.loadData", () => {
    it("fetches events.json and returns its JSON data", async () => {
      const response = {
        result: "ok",
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(response),
      });

      const result = await api.loadData();

      expect(global.fetch).toHaveBeenCalledWith("/events.json");
      expect(result).toEqual(response);
    });

    it("throws when fetch fails", async () => {
      const error = new Error("network error");

      global.fetch = jest.fn().mockRejectedValue(error);

      await expect(api.loadData()).rejects.toEqual(error);
    });
  });
});



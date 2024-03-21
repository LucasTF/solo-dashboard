import { describe, test, expect } from "vitest";
import format, {
  formatYYYYMMDD,
  formatDDMMYYYY,
  formatTime,
} from "../../../src/lib/utils/dateFormatter";

// Date: 18/02/2024
const dateWithoutTime = new Date(2024, 1, 17);

// DateTime: 18/02/2024 17:30:20
const dateWithTime = new Date(2024, 1, 17, 17, 30, 20);

describe("Date Formatting", () => {
  test("Should format date to DD-MM-YYYY", () => {
    expect(formatDDMMYYYY(dateWithoutTime)).toBe("18-02-2024");
  });
  test("Should format date to DD/MM/YYYY", () => {
    expect(formatDDMMYYYY(dateWithoutTime, "/")).toBe("18/02/2024");
  });
  test("Should format date to YYYY-MM-DD", () => {
    expect(formatYYYYMMDD(dateWithoutTime)).toBe("2024-02-18");
  });
  test("Should format date to YYYY/MM/DD", () => {
    expect(formatYYYYMMDD(dateWithoutTime, "/")).toBe("2024/02/18");
  });
});

describe("Time Formatting", () => {
  test("Should format time to HH:MM:SS", () => {
    expect(formatTime(dateWithTime)).toBe("17:30:20");
  });
  test("Should format timeless date to 00:00:00", () => {
    expect(formatTime(dateWithoutTime)).toBe("00:00:00");
  });
});

describe("DateTime Formatting", () => {
  test("Should format to DD-MM-YYYY HH:MM:SS", () => {
    expect(format(dateWithTime, "DDMMYYYY", true)).toBe("18-02-2024 17:30:20");
  });
  test("Should format to DD/MM/YYYY HH:MM:SS", () => {
    expect(format(dateWithTime, "DDMMYYYY", true, "/")).toBe(
      "18/02/2024 17:30:20"
    );
  });
  test("Should format timeless date to DD-MM-YYYY 00:00:00", () => {
    expect(format(dateWithoutTime, "DDMMYYYY", true)).toBe(
      "18-02-2024 00:00:00"
    );
  });
  test("Should format to YYYY-MM-DD HH:MM:SS", () => {
    expect(format(dateWithTime, "YYYYMMDD", true)).toBe("2024-02-18 17:30:20");
  });
  test("Should format to YYYY/MM/DD HH:MM:SS", () => {
    expect(format(dateWithTime, "YYYYMMDD", true, "/")).toBe(
      "2024/02/18 17:30:20"
    );
  });
  test("Should format timeless date to YYYY-MM-DD 00:00:00", () => {
    expect(format(dateWithoutTime, "YYYYMMDD", true)).toBe(
      "2024-02-18 00:00:00"
    );
  });
});

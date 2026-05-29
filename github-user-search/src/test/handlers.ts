import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { generateFakeUsers } from "./generateFakeUsers";

export const restHandlers = [
  http.get("https://api.github.com/search/users", () => {
    // generate fake user
    const randomNumberOfUsers = faker.number.int({ min: 5, max: 30 });
    const fakeUsers = generateFakeUsers(randomNumberOfUsers);

    return HttpResponse.json({
      total_count: fakeUsers.length,
      incomplete_results: false,
      items: fakeUsers,
    });
  }),
];

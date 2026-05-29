import { faker } from "@faker-js/faker";

export const generateFakeUsers = (num: number) => {
  const fakeUsers = Array.from({ length: num }, (_, i) => {
    const fakeUser = {
      id: i + 1,
      login: faker.internet.username(),
      avatar_url: faker.image.avatarGitHub(),
      html_url: faker.internet.url(),
    };
    return fakeUser;
  });

  return fakeUsers;
};

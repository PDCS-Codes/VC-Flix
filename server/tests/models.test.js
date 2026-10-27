
import test from "node:test";
import assert from "node:assert/strict";

import User from "../models/User.js";
import Title from "../models/Title.js";
import CollectionEntry from "../models/CollectionEntry.js";
import WatchlistEntry from "../models/WatchlistEntry.js";
import ShuffleSession from "../models/ShuffleSession.js";

test("User requires a display name", async () => {
  const user = new User({});
  await assert.rejects(user.validate(), { name: "ValidationError" });
});

test("Title only accepts movie or tv types", async () => {
  const title = new Title({
    name: "Test title",
    type: "documentary",
  });

  await assert.rejects(title.validate(), { name: "ValidationError" });
});

test("CollectionEntry rejects ratings above 10", async () => {
  const entry = new CollectionEntry({
    user: new User()._id,
    title: new Title({ name: "Test movie", type: "movie" })._id,
    rating: 11,
  });

  await assert.rejects(entry.validate(), { name: "ValidationError" });
});

test("WatchlistEntry requires a title", async () => {
  const entry = new WatchlistEntry({});

  await assert.rejects(entry.validate(), { name: "ValidationError" });
});

test("ShuffleSession only accepts supported statuses", async () => {
  const session = new ShuffleSession({
    createdBy: new User()._id,
    status: "secretly-revealed",
  });

  await assert.rejects(session.validate(), { name: "ValidationError" });
});

const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", (done) => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method remove", (done) => {
    // remove a bunch of records with some given criteria
    User.deleteOne({ name: "Joe" }, { useFindAndModify: false })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method findAndRemove", (done) => {
    User.findOneAndDelete({ name: "Joe" }, { useFindAndModify: false })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method findByIdAndRemove", (done) => {
    User.findByIdAndRemove(joe._id, { useFindAndModify: false })
      .then(() => User.findOne(joe._id))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});

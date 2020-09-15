const assert = require("assert");
const User = require("../src/user");

describe("updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find({}).then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
    });
  }

  it("instance type using set and save", (done) => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });

  it("model instance can update", (done) => {
    assertName(
      joe.updateOne({ name: "Alex" }, { useFindAndModify: false }),
      done
    );
  });

  it("model class can update", (done) => {
    assertName(
      User.updateOne(
        { name: "Joe" },
        { name: "Alex" },
        { useFindAndModify: false }
      ),
      done
    );
  });
  it("model class can update one record", (done) => {
    assertName(
      User.findOneAndUpdate(
        { name: "Joe" },
        { name: "Alex" },
        { useFindAndModify: false }
      ),
      done
    );
  });
  it("model class can update with an id and update", (done) => {
    assertName(
      User.findByIdAndUpdate(
        joe._id,
        { name: "Alex" },
        { useFindAndModify: false }
      ),
      done
    );
  });

  it("a user can have their post count incremented by 1", (done) => {
    User.updateOne({ name: "Joe" }, { $inc: { likes: 1 } }).then(() =>
      User.findOne({ name: "Joe" }).then((user) => {
        assert(user.likes === 1);
        done();
      })
    );
  });
});

const userArgs = process.argv.slice(2);
const User = require('./models/user')
const Post = require('./models/post')
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createPost();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

async function userCreate( username, password, first, last) {
    const user = new User (
        {
            username: username,
            password: password,
            first_name: first,
            last_name: last,        
        }
    )
    await user.save()
    console.log(`Added user: ${username}`)
}

async function postCreate( title, message, visible) {
    const post = new Post (
        {
            title: title,
            message: message,
            visible: true,
        },
    )
    await post.save()
    console.log(`Added ${title}`)
}

async function createPost() {
    await postCreate('My first post', 'this is my first message')
}

async function createUser() {
    await userCreate("admin", "myblogpassword", "Pooja", "Pawl")
}
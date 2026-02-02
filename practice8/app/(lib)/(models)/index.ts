import { Post } from "./PostModel";
import { User } from "./UserModel";

User.hasMany(Post, {
    foreignKey: "userId",
    as: "post",
});

Post.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

export {User, Post};
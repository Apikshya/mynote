import mongoose, {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true},
    password: String
})
export const UserModel = model("User", UserSchema);

const NoteSchema = new Schema({
    title: String,
    content: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

export const NoteModel = model("Note", NoteSchema);
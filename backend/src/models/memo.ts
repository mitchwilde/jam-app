import { InferSchemaType, model, Schema } from "mongoose";

const memoSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });

type Memo = InferSchemaType<typeof memoSchema>;

export default model<Memo>("Memo", memoSchema);

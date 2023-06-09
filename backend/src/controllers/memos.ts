import { RequestHandler} from "express";
import MemoModel from "../models/memo";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getMemos: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        const memos = await MemoModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(memos);
    } catch (error) {
        next(error);
    }
}

export const getMemo: RequestHandler = async (req, res, next) => {
    const memoId = req.params.memoId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(memoId)) {
            throw createHttpError(400, "Invalid memo Id")
        }

        const memo = await MemoModel.findById(memoId).exec();
        
        if (!memo) {
            throw createHttpError(404, "Memo not found");
        }
        
        if (!memo.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this memo");
        }
        res.status(200).json(memo);
    } catch (error) {
        next(error);
    }
};

interface CreateMemoBody {
    title?: string,
    text?: string,
}

export const createMemo: RequestHandler<unknown, unknown, CreateMemoBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        // check for title and send back descriptive error message if not present
        if(!title) {
            throw createHttpError(400, "Memo must have a title");
        }

        const newMemo = await MemoModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newMemo);
    } catch (error) {
        next(error);
    }
};

interface UpdateMemoParams {
    memoId: string,
}

interface UpdateMemoBody {
    title?: string,
    text?: string,
}

export const updateMemo: RequestHandler<UpdateMemoParams, unknown, UpdateMemoBody, unknown> = async(req, res, next) => {
    const memoId = req.params.memoId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(memoId)) {
            throw createHttpError(400, "Invalid memo Id")
        }

        if(!newTitle) {
            throw createHttpError(400, "Memo must have a title");
        }
        
        const memo = await MemoModel.findById(memoId).exec();

        if (!memo) {
            throw createHttpError(404, "Memo not found");
        }

        if (!memo.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this memo");
        }

        memo.title = newTitle;
        memo.text = newText;
        
        const updatedMemo = await memo.save();
        res.status(200).json(updatedMemo);
    } catch (error) {
        next(error);
    }
}

export const deleteMemo: RequestHandler = async(req, res, next) => {
    const memoId = req.params.memoId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(memoId)) {
            throw createHttpError(400, "Invalid memo Id")
        }

        const memo = await MemoModel.findById(memoId).exec();

        if (!memo) {
            throw createHttpError(404, "Memo not found");
        }

        if (!memo.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this memo");
        }

        memo.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
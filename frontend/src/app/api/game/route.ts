import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

export const POST = async (req: Request, res: Response) => {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return NextResponse.json(
                { error: "You are not authenticated." },
                {
                    status: 401,
                }
            );
        }
        const body = await req.json();
        const { amount, topic, type } = quizCreationSchema.parse(body);
        const game = await prisma.game.create({
            data: {
                gameType: type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic,
            }
        })
        await prisma.topic_count.upsert({
            where: {
                topic: topic,
            },
            create: {
                topic: topic,
                count: 1,
            },
            update: {
                count: {
                    increment: 1,
                },
            },
        });
        const {data} = await axios.post(`${process.env.API_URL}/api/questions`, {
            amount,
            topic,
            type,
        });
        if (type === "mcq") {
            type mcqQuestion = {
                question: string,
                answer: string,
                option1: string,
                option2: string,
                option3: string,
            }
            let manyData = data.questions.map((question: mcqQuestion) => {
                let options = [question.answer, question.option1, question.option2, question.option3];
                options = options.sort(() => Math.random() - 0.5);
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: "mcq",
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        else if (type === "open_ended") {
            type openEndedQuestion = {
                question: string,
                answer: string,
            }
            let manyData = data.questions.map((question: openEndedQuestion) => {
                return {
                    question: question.question,
                    answer: question.answer,
                    gameId: game.id,
                    questionType: "open_ended",
                }
            })
            await prisma.question.createMany({
                data: manyData
            })
        }
        return NextResponse.json({
            gameId: game.id,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: error.issues,
                },
                {
                    status: 400,
                }
            );
        } else {
            console.error("Something went wrong", error);
            return NextResponse.json(
                { error: "An unexpected error occurred." },
                {
                    status: 500,
                }
            );
        }
    }
}

// import { prisma } from "@/lib/db";
import { strict_output } from "../../../../lib/courseGpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "../../../../lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  transcript: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    console.log("hello")
    const body = await req.json();
    const { transcript } = bodyParser.parse(body);
    // const chapter = await prisma.chapter.findUnique({
    //   where: {
    //     id: chapterId,
    //   },
    // });
    // if (!chapter) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Chapter not found",
    //     },
    //     { status: 404 }
    //   );
    // }
    // console.log(chapter)
    // const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    // let transcript = await getTranscript(videoId);
    // let maxLength = 500; // let maxLength = 500; // let maxLength = 200;
    // transcript = transcript.split(" ").slice(0, maxLength).join(" ");
    // console.log(videoId, transcript);
    const { summary }: { summary: string } = await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" }
    );

    const { title }: { title: string } = await strict_output(
      "You are an AI capable of giving a suitable title for a summarized youtube transcript",
      "Give a title in 3 words or less.\n" +
        summary,
      { title: "title of the summary" }
    );

    const questions = await getQuestionsFromTranscript(
      transcript,
      title
    );

    // await prisma.quest.createMany({
    //   data: questions.map((question) => {
    //     let options = [
    //       question.answer,
    //       question.option1,
    //       question.option2,
    //       question.option3,
    //     ];
    //     options = options.sort(() => Math.random() - 0.5);
    //     return {
    //       question: question.question,
    //       answer: question.answer,
    //       options: JSON.stringify(options),
    //       chapterId: chapterId,
    //     };
    //   }),
    // });

    // await prisma.chapter.update({
    //   where: { id: chapterId },
    //   data: {
    //     videoId: videoId,
    //     summary: summary,
    //   },
    // });

    return NextResponse.json({ summary: summary, title: title, questions: questions });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "unknown",
        },
        { status: 500 }
      );
    }
  }
}
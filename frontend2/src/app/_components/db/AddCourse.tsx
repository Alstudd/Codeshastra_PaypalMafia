"use server";
import { db } from "~/server/db";

export async function AddCourse(cName, cDesc, price, session) {
  try {
    console.log("j");
    const newCourse = await db.teachercourse.create({
      data: {
        title: cName,
        description: cDesc,
        price: parseInt(price), // Assuming price is stored as an integer
        userId: session,
        // Add other necessary fields here
      },
    });

    console.log("Course created successfully:", newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
  }
}

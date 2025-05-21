import { db } from "@/db";
import { defineScript } from "rwsdk/worker";

export default defineScript(async () => {
  await db.$executeRawUnsafe(`\
    DELETE FROM Application;
    DELETE FROM ApplicationStatus;
    DELETE FROM Contact;
    DELETE FROM Company;
    DELETE FROM Credential;
    DELETE FROM User;
    DELETE FROM sqlite_sequence;
  `);

  await db.applicationStatus.createMany({
    data: [
      { id: 1, status: "New" },
      { id: 2, status: "Applied" },
      { id: 3, status: "Interview" },
      { id: 4, status: "Rejected" },
      { id: 5, status: "Offer" },
    ],
  });

  console.log("🌱 Finished seeding");
});

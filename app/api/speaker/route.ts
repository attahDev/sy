import {
  asOptionalString,
  asString,
  isValidEmail,
  isValidHttpUrl,
  jsonError,
  jsonSuccess,
} from "@/app/api/lib/api-helpers";
import { appendToSheet } from "@/app/api/lib/google-sheet";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = asString(body.fullName);
    const email = asString(body.email);
    const phoneNumber = asOptionalString(body.phoneNumber);
    const organisation = asString(body.organisation);
    const areaOfExpertise = asString(body.areaOfExpertise);
    const speakingTopics = asString(body.speakingTopics);
    const previousSpeakingExperience = asOptionalString(
      body.previousSpeakingExperience
    );
    const availability = asOptionalString(body.availability);
    const link = asOptionalString(body.link);
    const whySpeaker = asString(body.whySpeaker);

    if (!fullName) return jsonError("Full name is required");
    if (!email) return jsonError("Email is required");
    if (!isValidEmail(email)) return jsonError("Enter a valid email address");
    if (!organisation) return jsonError("Organisation is required");
    if (!areaOfExpertise) return jsonError("Area of expertise is required");
    if (!speakingTopics) return jsonError("Speaking topics are required");
    if (!whySpeaker) return jsonError("Why should you be a speaker is required");

    if (link && !isValidHttpUrl(link)) {
      return jsonError("Link must start with http:// or https://");
    }

    const submittedAt = new Date().toISOString();

    await appendToSheet("Speakers", [
      fullName,
      email,
      phoneNumber || "",
      organisation,
      areaOfExpertise,
      speakingTopics,
      previousSpeakingExperience || "",
      availability || "",
      link || "",
      whySpeaker,
      submittedAt,
    ]);

    return jsonSuccess(
      "Speaker application submitted successfully",
      {
        fullName,
        email,
        phoneNumber,
        organisation,
        areaOfExpertise,
        speakingTopics,
        previousSpeakingExperience,
        availability,
        link,
        whySpeaker,
        submittedAt,
      },
      201
    );
  } catch (error) {
    console.error("Google Sheet Error:", error);
    return jsonError("Something went wrong while submitting the form", 500);
  }
}
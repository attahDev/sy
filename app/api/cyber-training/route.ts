import {
  asOptionalString,
  asString,
  asStringArray,
  isValidEmail,
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
    const organisationBusiness = asOptionalString(body.organisationBusiness);
    const roleJobTitle = asOptionalString(body.roleJobTitle);
    const levelOfKnowledge = asString(body.levelOfKnowledge);
    const areasOfInterest = asStringArray(body.areasOfInterest);
    const whatToLearn = asString(body.whatToLearn);
    const preferredFormat = asString(body.preferredFormat);
    const receiveUpdates = asOptionalString(body.receiveUpdates);

    if (!fullName) return jsonError("Full name is required");
    if (!email) return jsonError("Email is required");
    if (!isValidEmail(email)) return jsonError("Enter a valid email address");
    if (!levelOfKnowledge) return jsonError("Level of knowledge is required");
    if (!whatToLearn) return jsonError("What you want to learn is required");
    if (!preferredFormat) return jsonError("Preferred format is required");

    const submittedAt = new Date().toISOString();

    await appendToSheet("CyberTraining", [
      fullName,
      email,
      phoneNumber || "",
      organisationBusiness || "",
      roleJobTitle || "",
      levelOfKnowledge,
      areasOfInterest.join(", "),
      whatToLearn,
      preferredFormat,
      receiveUpdates || "",
      submittedAt,
    ]);

    return jsonSuccess(
      "Cyber Security Training form submitted successfully",
      {
        fullName,
        email,
        phoneNumber,
        organisationBusiness,
        roleJobTitle,
        levelOfKnowledge,
        areasOfInterest,
        whatToLearn,
        preferredFormat,
        receiveUpdates,
        submittedAt,
      },
      201
    );
  } catch (error) {
    console.error("Google Sheet Error:", error);
    return jsonError("Something went wrong while submitting the form", 500);
  }
}
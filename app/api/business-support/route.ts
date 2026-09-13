import {
  asOptionalString,
  asString,
  asStringArray,
  isValidEmail,
  jsonError,
  jsonSuccess,
} from "@/app/api/lib/api-helpers";
import { submitToBackend } from "@/app/api/lib/backend-forms";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = asString(body.fullName);
    const email = asString(body.email);
    const businessName = asString(body.businessName);
    const stageOfBusiness = asString(body.stageOfBusiness);
    const industry = asString(body.industry);
    const supportNeeded = asStringArray(body.supportNeeded);
    const monthlyRevenue = asOptionalString(body.monthlyRevenue);
    const biggestChallenge = asString(body.biggestChallenge);
    const interestedIn = asStringArray(body.interestedIn);

    if (!fullName) return jsonError("Full name is required");
    if (!email) return jsonError("Email is required");
    if (!isValidEmail(email)) return jsonError("Enter a valid email address");
    if (!businessName) return jsonError("Business name is required");
    if (!stageOfBusiness) return jsonError("Stage of business is required");
    if (!industry) return jsonError("Industry is required");
    if (!biggestChallenge) return jsonError("Biggest challenge is required");

    const submittedAt = new Date().toISOString();
    await submitToBackend("business-support", {
      name: fullName,
      email,
      data: {
        fullName,
        email,
        businessName,
        stageOfBusiness,
        industry,
        supportNeeded,
        monthlyRevenue,
        biggestChallenge,
        interestedIn,
        submittedAt,
      },
    });

    return jsonSuccess(
      "Business Support form submitted successfully",
      {
        fullName,
        email,
        businessName,
        stageOfBusiness,
        industry,
        supportNeeded,
        monthlyRevenue,
        biggestChallenge,
        interestedIn,
        submittedAt,
      },
      201
    );
  } catch (error) {
    console.error("Form submission error (business-support):", error);
    return jsonError("Something went wrong while submitting the form", 500);
  }
}
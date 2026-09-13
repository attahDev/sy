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
    const phoneNumber = asOptionalString(body.phoneNumber);
    const cityRegion = asString(body.cityRegion);
    const organizationCompany = asOptionalString(body.organizationCompany);
    const jobTitleRole = asOptionalString(body.jobTitleRole);
    const attendingAs = asString(body.attendingAs);
    const areasOfInterest = asStringArray(body.areasOfInterest);
    const hopingToGain = asOptionalString(body.hopingToGain);
    const joinAfterEvent = asOptionalString(body.joinAfterEvent);

    if (!fullName) return jsonError("Full name is required");
    if (!email) return jsonError("Email is required");
    if (!isValidEmail(email)) return jsonError("Enter a valid email address");
    if (!cityRegion) return jsonError("City / Region is required");
    if (!attendingAs) return jsonError("Attending as is required");

    const submittedAt = new Date().toISOString();

    await submitToBackend("join-us", {
      name: fullName,
      email,
      data: {
        fullName,
        email,
        phoneNumber,
        cityRegion,
        organizationCompany,
        jobTitleRole,
        attendingAs,
        areasOfInterest,
        hopingToGain,
        joinAfterEvent,
        submittedAt,
      },
    });

    return jsonSuccess(
      "Join Us form submitted successfully",
      {
        fullName,
        email,
        phoneNumber,
        cityRegion,
        organizationCompany,
        jobTitleRole,
        attendingAs,
        areasOfInterest,
        hopingToGain,
        joinAfterEvent,
        submittedAt,
      },
      201
    );
  } catch (error) {
    console.error("Form submission error (join-us):", error);
    return jsonError("Something went wrong while submitting the form", 500);
  }
}
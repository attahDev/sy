import {
  asOptionalString,
  asString,
  isValidHttpUrl,
  isValidEmail,
  jsonError,
  jsonSuccess,
} from "@/app/api/lib/api-helpers";
import { appendToSheet } from "@/app/api/lib/google-sheet";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const yourName = asString(body.yourName);
    const yourEmail = asString(body.yourEmail);
    const nomineeName = asString(body.nomineeName);
    const nomineeOrganisation = asOptionalString(body.nomineeOrganisation);
    const nomineeLocation = asOptionalString(body.nomineeLocation);
    const category = asString(body.category);
    const whyNominate = asString(body.whyNominate);
    const achievements = asOptionalString(body.achievements);
    const links = asOptionalString(body.links);
    const referee = asOptionalString(body.referee);

    if (!yourName) return jsonError("Your name is required");
    if (!yourEmail) return jsonError("Your email is required");
    if (!isValidEmail(yourEmail))
      return jsonError("Enter a valid email address");
    if (!nomineeName) return jsonError("Nominee full name is required");
    if (!category) return jsonError("Category is required");
    if (!whyNominate)
      return jsonError("Why you are nominating this person is required");
    if (links && !isValidHttpUrl(links)) {
      return jsonError("Supporting link must start with http:// or https://");
    }

    const submittedAt = new Date().toISOString();

    await appendToSheet("Nominate", [
      yourName,
      yourEmail,
      nomineeName,
      nomineeOrganisation || "",
      nomineeLocation || "",
      category,
      whyNominate,
      achievements || "",
      links || "",
      referee || "",
      submittedAt,
    ]);

    return jsonSuccess(
      "Nomination submitted successfully",
      {
        yourName,
        yourEmail,
        nomineeName,
        nomineeOrganisation,
        nomineeLocation,
        category,
        whyNominate,
        achievements,
        links,
        referee,
        submittedAt,
      },
      201
    );
  } catch (error) {
    console.error("Google Sheet Error:", error);
    return jsonError("Something went wrong while submitting the form", 500);
  }
}
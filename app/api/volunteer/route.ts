import {
    asOptionalString,
    asString,
    isValidEmail,
    isValidHttpUrl,
    jsonError,
    jsonSuccess,
  } from "@/app/api/lib/api-helpers";
  import { submitToBackend } from "@/app/api/lib/backend-forms";
  
  export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      const fullName = asString(body.fullName);
      const email = asString(body.email);
      const phoneNumber = asString(body.phoneNumber);
      const location = asString(body.location);
      const occupation = asOptionalString(body.occupation);
      const areaOfInterest = asString(body.areaOfInterest);
      const availability = asString(body.availability);
      const previousExperience = asOptionalString(body.previousExperience);
      const whyVolunteer = asString(body.whyVolunteer);
      const link = asOptionalString(body.link);
  
      if (!fullName) return jsonError("Full name is required");
      if (!email) return jsonError("Email is required");
      if (!isValidEmail(email)) return jsonError("Enter a valid email address");
      if (!phoneNumber) return jsonError("Phone number is required");
      if (!location) return jsonError("Location is required");
      if (!areaOfInterest) return jsonError("Area of interest is required");
      if (!availability) return jsonError("Availability is required");
      if (!whyVolunteer) return jsonError("Why you want to volunteer is required");
  
      if (link && !isValidHttpUrl(link)) {
        return jsonError("Link must start with http:// or https://");
      }
  
      const submittedAt = new Date().toISOString();

      await submitToBackend("volunteer", {
        name: fullName,
        email,
        data: {
          fullName,
          email,
          phoneNumber,
          location,
          occupation,
          areaOfInterest,
          availability,
          previousExperience,
          whyVolunteer,
          link,
          submittedAt,
        },
      });
  
      return jsonSuccess(
        "Volunteer application submitted successfully",
        {
          fullName,
          email,
          phoneNumber,
          location,
          occupation,
          areaOfInterest,
          availability,
          previousExperience,
          whyVolunteer,
          link,
          submittedAt,
        },
        201
      );
    } catch (error) {
      console.error("Form submission error (volunteer):", error);
      return jsonError("Something went wrong while submitting the form", 500);
    }
  }
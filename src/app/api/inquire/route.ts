import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting and duplicate submission prevention
interface SubmissionRecord {
  timestamp: number;
  hash: string;
}

const recentSubmissions = new Map<string, SubmissionRecord>();

// Clean up expired records every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupOldSubmissions() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    lastCleanup = now;
    for (const [key, record] of recentSubmissions.entries()) {
      if (now - record.timestamp > 60 * 1000) {
        recentSubmissions.delete(key);
      }
    }
  }
}

// Input sanitization: escapes HTML entities to prevent HTML injection in emails and displays
function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Basic email validation regex conforming to standard RFC specs
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: NextRequest) {
  try {
    cleanupOldSubmissions();

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      brand,
      services,
      timeline,
      budget,
      brief,
      website, // Honeypot field: must remain empty
      renderedAt, // Anti-bot timestamp
    } = body;

    // 1. Abuse Protection: Honeypot Check
    // If the hidden 'website' field is filled, an automated bot filled all inputs
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: "Suspicious submission rejected." },
        { status: 400 }
      );
    }

    // 2. Abuse Protection: Speed check (submitted faster than a human could physically type)
    if (typeof renderedAt === "number" && renderedAt > 0) {
      const durationMs = Date.now() - renderedAt;
      if (durationMs > 0 && durationMs < 1200) {
        return NextResponse.json(
          { success: false, error: "Submission completed unnaturally fast. Please retry." },
          { status: 400 }
        );
      }
    }

    // 3. Field Validation
    const rawName = typeof name === "string" ? name.trim() : "";
    const rawEmail = typeof email === "string" ? email.trim() : "";
    const rawBrand = typeof brand === "string" ? brand.trim() : "";
    const rawTimeline = typeof timeline === "string" ? timeline.trim() : "1-3 months";
    const rawBudget = typeof budget === "string" ? budget.trim() : "Standard Production";
    const rawBrief = typeof brief === "string" ? brief.trim() : "";

    if (!rawName || rawName.length < 2 || rawName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (between 2 and 100 characters)." },
        { status: 400 }
      );
    }

    if (!rawEmail || rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!rawBrand || rawBrand.length < 1 || rawBrand.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please enter your brand or entity name." },
        { status: 400 }
      );
    }

    if (rawBrief.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Project brief is too long (maximum 3,000 characters)." },
        { status: 400 }
      );
    }

    // Sanitize array of selected services
    const sanitizedServices: string[] = Array.isArray(services)
      ? services
          .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
          .slice(0, 10)
          .map((s) => sanitize(s.slice(0, 100)))
      : [];

    const sanitizedName = sanitize(rawName);
    const sanitizedEmail = sanitize(rawEmail);
    const sanitizedBrand = sanitize(rawBrand);
    const sanitizedTimeline = sanitize(rawTimeline.slice(0, 100));
    const sanitizedBudget = sanitize(rawBudget.slice(0, 100));
    const sanitizedBrief = sanitize(rawBrief);

    // 4. Duplicate Submission Protection
    // Block identical email + brand submissions within 20 seconds
    const submissionKey = `${sanitizedEmail.toLowerCase()}:${sanitizedBrand.toLowerCase()}`;
    const existingRecord = recentSubmissions.get(submissionKey);
    const now = Date.now();

    if (existingRecord && now - existingRecord.timestamp < 20000) {
      return NextResponse.json(
        {
          success: false,
          error: "An inquiry for this brand was just received. Please wait a few moments before resubmitting.",
        },
        { status: 429 }
      );
    }

    // 5. Verification of Email Delivery Service Credentials
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL || "inquiries@warlistudios.com";
    // Resend free tier/test accounts must use onboarding@resend.dev until custom domain is verified
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Warli Studio <onboarding@resend.dev>";

    // If Resend API key is not configured, do NOT fake success
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error:
            "The studio email delivery service is currently not configured (missing RESEND_API_KEY). Please contact us directly at " +
            toEmail +
            ".",
        },
        { status: 503 }
      );
    }

    // 6. Build High-Fidelity Editorial Email
    const disciplinesHtml =
      sanitizedServices.length > 0
        ? sanitizedServices
            .map(
              (s) =>
                `<span style="display:inline-block;padding:4px 10px;margin:3px;background:#201e1d;color:#f5f0e8;border:1px solid rgba(255,255,255,0.1);font-family:monospace;font-size:11px;border-radius:2px;">${s}</span>`
            )
            .join(" ")
        : '<span style="color:#888;font-style:italic;">None specified</span>';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry — Warli Studio</title>
</head>
<body style="margin:0;padding:24px;background-color:#121212;color:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#171717;border:1px solid rgba(255,255,255,0.15);border-radius:4px;overflow:hidden;">
    <div style="background:#1c1a19;padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.1);">
      <span style="font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#d85c3f;">NEW CLIENT INQUIRY // DIRECT COMMISSION</span>
      <h1 style="margin:8px 0 0 0;font-size:22px;color:#f5f0e8;font-weight:600;">${sanitizedBrand}</h1>
    </div>

    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:8px 0;width:140px;font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Client Name</td>
          <td style="padding:8px 0;color:#f5f0e8;font-size:14px;font-weight:500;">${sanitizedName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Work Email</td>
          <td style="padding:8px 0;color:#d85c3f;font-size:14px;"><a href="mailto:${sanitizedEmail}" style="color:#d85c3f;text-decoration:none;">${sanitizedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Brand / Entity</td>
          <td style="padding:8px 0;color:#f5f0e8;font-size:14px;">${sanitizedBrand}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Timeline Target</td>
          <td style="padding:8px 0;color:#f5f0e8;font-size:14px;">${sanitizedTimeline}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Investment Scope</td>
          <td style="padding:8px 0;color:#f5f0e8;font-size:14px;">${sanitizedBudget}</td>
        </tr>
      </table>

      <div style="margin-bottom:24px;">
        <span style="font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:8px;">Desired Disciplines</span>
        <div>${disciplinesHtml}</div>
      </div>

      <div style="margin-bottom:24px;background:#121212;padding:16px;border:1px solid rgba(255,255,255,0.08);border-radius:3px;">
        <span style="font-family:monospace;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:8px;">Project Brief & Ambition</span>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#e6e1d8;white-space:pre-wrap;">${sanitizedBrief || "No additional brief details provided."}</p>
      </div>

      <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);font-family:monospace;font-size:11px;color:#777;">
        Submitted from warlistudio.vercel.app · ${new Date().toUTCString()}
      </div>
    </div>
  </div>
</body>
</html>
`;

    const textContent = `
NEW CLIENT INQUIRY — WARLI STUDIO
=================================

Client Name: ${sanitizedName}
Work Email: ${sanitizedEmail}
Brand / Entity: ${sanitizedBrand}
Timeline Target: ${sanitizedTimeline}
Investment Scope: ${sanitizedBudget}

Desired Disciplines:
${sanitizedServices.length > 0 ? sanitizedServices.map((s) => `- ${s}`).join("\n") : "None specified"}

Project Brief:
${sanitizedBrief || "No additional brief details provided."}

Submitted: ${new Date().toUTCString()}
`;

    // 7. Dispatch via Resend REST API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: rawEmail,
        subject: `New Project Commission: ${sanitizedBrand} — ${sanitizedName}`,
        html: htmlContent,
        text: textContent,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      // Record submission attempt to avoid rapid retry spam
      recentSubmissions.set(submissionKey, { timestamp: now, hash: submissionKey });

      return NextResponse.json(
        {
          success: false,
          error:
            typeof errorData.message === "string"
              ? `Delivery provider notice: ${errorData.message}`
              : "Email delivery failed to send. Please contact us directly at " + toEmail + ".",
        },
        { status: 502 }
      );
    }

    const data = await resendResponse.json();

    // Record successful submission
    recentSubmissions.set(submissionKey, { timestamp: now, hash: submissionKey });

    return NextResponse.json({
      success: true,
      messageId: data?.id || "accepted",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}

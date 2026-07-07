// Placeholder callback endpoint for Safaricom Daraja payment confirmations.
// Safaricom will POST payment confirmation data to this URL.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  // Safaricom will send a JSON body; store/process as needed.
  try {
    const data = req.body;

    // TODO: verify and persist payment confirmation, update donation records, notify admins, etc.
    console.log("M-Pesa callback received:", JSON.stringify(data));

    // Respond with 200 to acknowledge receipt.
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to process callback" });
  }
}

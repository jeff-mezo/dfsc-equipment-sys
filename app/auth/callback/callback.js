import { handleGoogleCallback } from "@/utils/supabase/google";

export default async function handler(req, res) {
  try {
    // Extract access token from request query
    const accessToken = req.query.code;

    // Call handleGoogleCallback to process data and update Supabase
    await handleGoogleCallback(req, res, accessToken);

    // Redirect user to a success page or dashboard after successful processing
    res.redirect('/equipmentpage');
  } catch (error) {
    console.error('Error in handleGoogleCallback:', error);
    res.status(500).send('Error during Google Sign-in');
  }
}
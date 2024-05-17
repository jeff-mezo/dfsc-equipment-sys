const { google } = require('googleapis');
import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const signInWithGoogle = () =>
    {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: location.origin + "/auth/callback",
          scopes: "openid, https://www.googleapis.com/auth/profile.agerange.read, https://www.googleapis.com/auth/user.birthday.read, https://www.googleapis.com/auth/user.gender.read, https://www.googleapis.com/auth/user.organization.read, https://www.googleapis.com/auth/user.phonenumbers.read, https://www.googleapis.com/auth/userinfo.profile",
        },
      })
      
    }
    
export const handleGoogleCallback = async (req: any, res: any) => {
    try {
        // Extract access token from request (replace with your logic)
        const accessToken = req.query.code; // This might be different depending on your framework
    
        const people = google.people({ version: 'v1', auth: accessToken });
    
        const response = await people.people.get({
        resourceName: 'people/me',
        personFields: ['ageRanges', 'birthdays', 'genders', 'organizations', 'phoneNumbers'],
        });
    
        const userData = response.data;
    
        // Process user data if needed (e.g., format birthdays)
    
        // Update Supabase user with additional data
        await supabase.auth.updateUser({
        data: {
            // Add relevant user data from userData object
            ageRange: userData.ageRanges[0].ageRange, // Assuming first age range
            birthday: userData.birthdays[0].date, // Assuming first birthday
            gender: userData.genders[0].value, // Assuming first gender
            organization: userData.organizations?.[0].name, // Check if organization exists
            phoneNumbers: userData.phoneNumbers?.map((num: { value: string }) => num.value), // Map phone numbers
        },
        });
    
        res.status(200).send('User data updated successfully');
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error updating user data');
    }
    };


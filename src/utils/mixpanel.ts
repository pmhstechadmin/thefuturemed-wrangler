// // // // src/utils/mixpanel.js
// // // // import mixpanel from 'mixpanel-browser';

// // // // mixpanel.init('3f6a035015c6ab2d765e5bff2efe39df', {
// // // //   debug: true,
// // // //   track_pageview: false, // We'll handle it manually
// // // // });

// // // // export default mixpanel;

// // // import mixpanel from 'mixpanel-browser';
// // // import { debugPort } from 'process';

// // // const isProd = process.env.NODE_ENV === 'production';

// // // mixpanel.init('3f6a035015c6ab2d765e5bff2efe39df', {
// // //   debug: !isProd, // Only debug in development
// // //   track_pageview: true,
// // //   persistence: 'localStorage',
// // //   ignore_dnt: true, // Respect Do Not Track
// // //   api_host: 'https://api.mixpanel.com',
// // // });

// // // // Export the initialized instance
// // // export const mixpanelInstance = mixpanel;

// // //  export default mixpanel;

// // import mixpanel from 'mixpanel-browser';
// // import { debugPort } from 'process';

// // const isProd = process.env.NODE_ENV === 'production';

// // mixpanel.init('3f6a035015c6ab2d765e5bff2efe39df', {
// //   debug: !isProd, // Only debug in development
// //   track_pageview: true,
// //   persistence: 'localStorage',
// //   ignore_dnt: true, // Respect Do Not Track
// //   api_host: 'https://api.mixpanel.com',
// // });

// // // Export the initialized instance
// // export const mixpanelInstance = mixpanel;

// // export const handle_login = async (loginApiCall: () => Promise<{
// //   id: string;
// //   first_name: string;
// //   last_name: string;
// // }>) => {
// //   try {
// //     const user = await loginApiCall();
    
// //     // Track successful login
// //     mixpanel.identify(user.id);
// //     mixpanel.track('Successful login');
// //     mixpanel.people.set({
// //       $first_name: user.first_name,
// //       $last_name: user.last_name,
// //       $created: new Date().toISOString(),
// //     });
    
// //     // You can add additional user properties if needed
// //     mixpanel.people.set_once({
// //       'First login date': new Date().toISOString(),
// //     });

// //     return user; // Return the user for further processing
    
// //   } catch (error) {
// //     // Track failed login attempt
// //     mixpanel.track('Unsuccessful login', {
// //       error: error instanceof Error ? error.message : 'Unknown error',
// //     });
    
// //     // Re-throw the error so calling code can handle it
// //     throw error;
// //   }
// // };

// // export default mixpanel;

// import mixpanel from 'mixpanel-browser';

// const isProd = process.env.NODE_ENV === 'production';

// mixpanel.init('3f6a035015c6ab2d765e5bff2efe39df', {
//   debug: !isProd,
//   track_pageview: true,
//   persistence: 'localStorage',
//   ignore_dnt: true,
//   api_host: 'https://api.mixpanel.com',
// });

// // Track registration events
// export const trackRegistration = (user: {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   category: string;
//   medicalSpecialty: string;
// }) => {
//   mixpanel.identify(user.id);
//   mixpanel.track('Registration', {
//     'Signup Type': 'Email',
//     'User Category': user.category,
//     'Medical Specialty': user.medicalSpecialty,
//   });
//   mixpanel.people.set({
//     $email: user.email,
//     $first_name: user.firstName,
//     $last_name: user.lastName,
//     'Category': user.category,
//     'Medical Specialty': user.medicalSpecialty,
//     'Signup Date': new Date().toISOString(),
//   });
// };

// // Track login events
// export const trackLogin = (user: {
//   id: string;
//   email: string;
// }) => {
//   mixpanel.identify(user.id);
//   mixpanel.track('Login', {
//     'Login Type': 'Email',
//   });
//   mixpanel.people.set({
//     'Last Login': new Date().toISOString(),
//   });
// };

// // Track failed login attempts
// export const trackFailedLogin = (email: string, error: string) => {
//   mixpanel.track('Failed Login Attempt', {
//     email: email,
//     error: error,
//   });
// };
// export const mixpanelInstance = mixpanel;
// export default mixpanel;

import mixpanel from 'mixpanel-browser';
declare module "mixpanel-browser" {
  interface Config {
    record_heatmap_data?: boolean;
  }
}
const isProd = process.env.NODE_ENV === 'production';
const mixpanel_token = import.meta.env.VITE_MIXPANEL_ID;
const mixpanel_api = import.meta.env.VITE_MIXPANEL_API_ID;
// Initialize Mixpanel
mixpanel.init(mixpanel_token, {
  debug: !isProd,
  track_pageview: true,
  persistence: 'localStorage',
  ignore_dnt: true,
  api_host: mixpanel_api,
  record_sessions_percent: 1,
  record_heatmap_data: true
});


export const setMixpanelSessionId = (sessionId: string) => {
  mixpanel.register({
    session_id: sessionId,
  });
};

export const trackLoginSuccess = (userId: string, userData: { first_name: string; last_name: string; email?: string }) => {
  mixpanel.identify(userId);
  mixpanel.track('Successful login', {
    login_method: 'email_password' // or 'google', 'facebook', etc.
  });
  
  mixpanel.people.set({
    $first_name: userData.first_name,
    $last_name: userData.last_name,
    $email: userData.email || '',
    $created: new Date().toISOString(),
  });
  
  mixpanel.people.set_once({
    'First login date': new Date().toISOString(),
  });
};

export const trackLoginFailure = (error: Error) => {
  mixpanel.track('Unsuccessful login', {
    error: error.message,
    timestamp: new Date().toISOString()
  });
};

export const trackSignup = (userId: string, userData: { first_name: string; last_name: string; email: string }) => {
  mixpanel.identify(userId);
  mixpanel.track('Signup', {
    signup_method: 'email_password'
  });
  
  mixpanel.people.set({
    $first_name: userData.first_name,
    $last_name: userData.last_name,
    $email: userData.email,
    $created: new Date().toISOString(),
  });
};
export const mixpanelInstance = mixpanel;
export default mixpanel;
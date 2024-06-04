import { ApplicationConfig } from "@angular/core";
import { provideFirebaseApp, initializeApp} from "@angular/fire/app";
import { provideRouter } from "@angular/router";
//import { routes } from "./app-routing.module";
import { provideHttpClient } from "@angular/common/http";
import { firebaseConfig } from "./environments/environment";
import { getAuth, provideAuth} from "@angular/fire/auth"

export const appConfig: ApplicationConfig = {
    providers: [
      //provideRouter(routes),
      provideHttpClient(),      
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
      //provideFirestore(() => getFirestore()),
    ]
};

// export const defaults: AppSettings = {
//     dir: 'ltr',
//     theme: 'light', 
//     sidenavOpened: true,
//     sidenavCollapsed: true, // change is here
//     boxed: true,
//     horizontal: true, // change is here
//     cardBorder: false,
//     activeTheme: 'blue_theme',
//     language: 'en-us',
//     navPos: 'side',
//   };
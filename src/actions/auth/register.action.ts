
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";
import { firebase } from "@/firebase/config";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async({name, email, password, remember_me} , {cookies} ) => {
        // Cookies
        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 any
                path: '/',
            });
        } else {
            cookies.delete('email', {
                path: '/'
            });
        }

        // Creació d'usuari
        try {
            const user = await createUserWithEmailAndPassword(
                firebase.auth, 
                email, 
                password
            );

            //Actualitzar el nom (Firebase displayName)
            updateProfile(firebase.auth.currentUser!, {
                displayName: name
            });

            // Verificar email
            await sendEmailVerification(firebase.auth.currentUser!, {
                // url: 'http://localhost:4321/protected?emailVerified=true'
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
            });

            return {
                uid: user.user.uid,
                email: user.user.email
             }
            
        } catch (error) {

            const firebaseError = error as AuthError;
            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('Aquest email ja està usat');
                
            }

            throw new Error('Auxili!, alguna cosa no ha anat bé');
        }


    },
});
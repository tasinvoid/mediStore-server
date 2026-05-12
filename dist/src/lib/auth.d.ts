export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    baseURL: string | undefined;
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: true;
    };
    emailVerification: {
        sendOnSignUp: true;
        sendVerificationEmail: ({ user, url, token }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }, request: Request | undefined) => Promise<void>;
    };
    user: {
        additionalFields: {
            roles: {
                type: "string";
                defaultValue: "CUSTOMER";
                required: false;
            };
            status: {
                type: "string";
                defaultValue: "ACTIVE";
                required: false;
            };
        };
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
            accessType: "offline";
            prompt: "select_account consent";
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map
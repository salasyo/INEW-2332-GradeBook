export { };
 
// Create a type for the roles
export type Roles = "admin" | "student" | "instructor" | "none"

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}
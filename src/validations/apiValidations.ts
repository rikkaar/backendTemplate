import { Roles } from "@prisma/client";

// Described access for each role with defined enum
export const RolesAccess: {[key in Roles]: Roles[]} = {
	admin: [Roles.admin, Roles.employee, Roles.user],
	employee: [Roles.employee, Roles.user],
	user: [Roles.user],
}
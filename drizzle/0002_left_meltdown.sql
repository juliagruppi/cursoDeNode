CREATE TABLE "enrollments" (
	"userId" uuid NOT NULL,
	"curseId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_curseId_courses_id_fk" FOREIGN KEY ("curseId") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
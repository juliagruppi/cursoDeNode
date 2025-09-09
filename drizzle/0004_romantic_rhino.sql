ALTER TABLE "enrollments" RENAME COLUMN "curseId" TO "courseId";--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_curseId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
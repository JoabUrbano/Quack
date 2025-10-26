-- DropIndex
DROP INDEX "public"."Flight_flightNumber_key";

-- AlterTable
CREATE SEQUENCE flight_flightnumber_seq;
ALTER TABLE "Flight" ALTER COLUMN "flightNumber" SET DEFAULT nextval('flight_flightnumber_seq');
ALTER SEQUENCE flight_flightnumber_seq OWNED BY "Flight"."flightNumber";

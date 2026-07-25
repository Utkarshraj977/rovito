-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('CUSTOMER', 'OWNER');

-- CreateEnum
CREATE TYPE "public"."VehicleType" AS ENUM ('SEDAN', 'SUV', 'MINIVAN', 'LUXURY', 'WHEELCHAIR_ACCESSIBLE');

-- CreateEnum
CREATE TYPE "public"."TransmissionType" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "public"."VehicleOperationalStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "public"."VehicleAvailabilityStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'ON_TRIP');

-- CreateEnum
CREATE TYPE "public"."DriverOperationalStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "public"."DriverAvailabilityStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'OFF_DUTY');

-- CreateEnum
CREATE TYPE "public"."TripType" AS ENUM ('ONE_WAY', 'ROUND_TRIP', 'AIRPORT_PICKUP', 'AIRPORT_DROPOFF', 'HOURLY');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'PAYMENT_PENDING', 'CONFIRMED', 'VEHICLE_ASSIGNED', 'DRIVER_ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentGateway" AS ENUM ('STRIPE', 'SQUARE', 'PAYPAL', 'CASH', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CARD', 'APPLE_PAY', 'GOOGLE_PAY', 'BANK_TRANSFER', 'CASH');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'IN_APP', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "public"."NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'READ');

-- CreateEnum
CREATE TYPE "public"."CancellationBy" AS ENUM ('CUSTOMER', 'OWNER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "public"."ContactMessageStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'CLOSED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '+1',
    "phone" VARCHAR(20) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token_hash" TEXT NOT NULL,
    "device_name" VARCHAR(100),
    "browser" VARCHAR(100),
    "operating_system" VARCHAR(100),
    "ip_address" VARCHAR(45),
    "expires_at" TIMESTAMPTZ NOT NULL,
    "last_used_at" TIMESTAMPTZ,
    "revoked_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicles" (
    "id" UUID NOT NULL,
    "display_name" VARCHAR(100) NOT NULL,
    "make" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "model_year" INTEGER NOT NULL,
    "registration_number" VARCHAR(30) NOT NULL,
    "vehicle_type" "public"."VehicleType" NOT NULL,
    "transmission_type" "public"."TransmissionType" NOT NULL,
    "fuel_type" "public"."FuelType" NOT NULL,
    "passenger_capacity" SMALLINT NOT NULL,
    "luggage_capacity" SMALLINT,
    "color" VARCHAR(30),
    "operational_status" "public"."VehicleOperationalStatus" NOT NULL DEFAULT 'ACTIVE',
    "availability_status" "public"."VehicleAvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicle_images" (
    "id" UUID NOT NULL,
    "vehicle_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "alt_text" VARCHAR(255),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "display_order" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehicle_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."drivers" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255),
    "country_code" VARCHAR(10) DEFAULT '+1',
    "phone" VARCHAR(20) NOT NULL,
    "license_number" VARCHAR(100) NOT NULL,
    "profile_image" TEXT,
    "status" "public"."DriverOperationalStatus" NOT NULL DEFAULT 'ACTIVE',
    "availability_status" "public"."DriverAvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "id" UUID NOT NULL,
    "booking_reference" VARCHAR(30) NOT NULL,
    "customer_id" UUID NOT NULL,
    "vehicle_id" UUID,
    "driver_id" UUID,
    "trip_type" "public"."TripType" NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "dropoff_address" TEXT NOT NULL,
    "pickup_date" DATE NOT NULL,
    "pickup_time" TIME(6) NOT NULL,
    "passenger_count" SMALLINT NOT NULL,
    "luggage_count" SMALLINT,
    "special_instructions" TEXT,
    "estimated_fare" DECIMAL(10,2) NOT NULL,
    "final_fare" DECIMAL(10,2),
    "booking_status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "cancelled_by" "public"."CancellationBy",
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."booking_status_history" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "status" "public"."BookingStatus" NOT NULL,
    "remarks" TEXT,
    "changed_by_user_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "transaction_id" VARCHAR(255),
    "gateway" "public"."PaymentGateway" NOT NULL,
    "payment_method" "public"."PaymentMethod" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'CAD',
    "payment_status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paid_at" TIMESTAMPTZ,
    "gateway_response" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "booking_id" UUID,
    "type" "public"."NotificationType" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "public"."NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "sent_at" TIMESTAMPTZ,
    "read_at" TIMESTAMPTZ,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "review" TEXT,
    "owner_reply" TEXT,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact_messages" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "subject" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "public"."ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "replied_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pricing_settings" (
    "id" UUID NOT NULL,
    "base_fare" DECIMAL(10,2) NOT NULL,
    "per_km_rate" DECIMAL(10,2) NOT NULL,
    "per_minute_rate" DECIMAL(10,2) NOT NULL,
    "minimum_fare" DECIMAL(10,2) NOT NULL,
    "cancellation_fee" DECIMAL(10,2) NOT NULL,
    "airport_surcharge" DECIMAL(10,2) NOT NULL,
    "tax_percentage" DECIMAL(5,2) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'CAD',
    "effective_from" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pricing_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(100) NOT NULL,
    "entity_id" UUID,
    "old_data" JSONB,
    "new_data" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "public"."users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "public"."users"("role");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_idx" ON "public"."user_sessions"("user_id");

-- CreateIndex
CREATE INDEX "user_sessions_expires_at_idx" ON "public"."user_sessions"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_registration_number_key" ON "public"."vehicles"("registration_number");

-- CreateIndex
CREATE INDEX "vehicles_vehicle_type_idx" ON "public"."vehicles"("vehicle_type");

-- CreateIndex
CREATE INDEX "vehicles_availability_status_idx" ON "public"."vehicles"("availability_status");

-- CreateIndex
CREATE INDEX "vehicles_operational_status_idx" ON "public"."vehicles"("operational_status");

-- CreateIndex
CREATE INDEX "vehicle_images_vehicle_id_idx" ON "public"."vehicle_images"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "public"."drivers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_phone_key" ON "public"."drivers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_license_number_key" ON "public"."drivers"("license_number");

-- CreateIndex
CREATE INDEX "drivers_status_idx" ON "public"."drivers"("status");

-- CreateIndex
CREATE INDEX "drivers_availability_status_idx" ON "public"."drivers"("availability_status");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_booking_reference_key" ON "public"."bookings"("booking_reference");

-- CreateIndex
CREATE INDEX "bookings_customer_id_idx" ON "public"."bookings"("customer_id");

-- CreateIndex
CREATE INDEX "bookings_vehicle_id_idx" ON "public"."bookings"("vehicle_id");

-- CreateIndex
CREATE INDEX "bookings_driver_id_idx" ON "public"."bookings"("driver_id");

-- CreateIndex
CREATE INDEX "bookings_booking_status_idx" ON "public"."bookings"("booking_status");

-- CreateIndex
CREATE INDEX "bookings_pickup_date_idx" ON "public"."bookings"("pickup_date");

-- CreateIndex
CREATE INDEX "booking_status_history_booking_id_idx" ON "public"."booking_status_history"("booking_id");

-- CreateIndex
CREATE INDEX "booking_status_history_status_idx" ON "public"."booking_status_history"("status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_booking_id_key" ON "public"."payments"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "public"."payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_payment_status_idx" ON "public"."payments"("payment_status");

-- CreateIndex
CREATE INDEX "payments_gateway_idx" ON "public"."payments"("gateway");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "public"."notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_booking_id_idx" ON "public"."notifications"("booking_id");

-- CreateIndex
CREATE INDEX "notifications_status_idx" ON "public"."notifications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_booking_id_key" ON "public"."reviews"("booking_id");

-- CreateIndex
CREATE INDEX "reviews_customer_id_idx" ON "public"."reviews"("customer_id");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "public"."reviews"("rating");

-- CreateIndex
CREATE INDEX "contact_messages_status_idx" ON "public"."contact_messages"("status");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "public"."audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_idx" ON "public"."audit_logs"("entity_type");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "public"."audit_logs"("action");

-- AddForeignKey
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vehicle_images" ADD CONSTRAINT "vehicle_images_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_status_history" ADD CONSTRAINT "booking_status_history_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_status_history" ADD CONSTRAINT "booking_status_history_changed_by_user_id_fkey" FOREIGN KEY ("changed_by_user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

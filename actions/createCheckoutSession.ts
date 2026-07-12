"use server";

import stripe from "@/lib/stripe";
import type { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import type { CartItem } from "@/store";
import type Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

function getBaseUrl() {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  const baseUrl =
    configuredBaseUrl ||
    (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is required in production");
  }

  const parsedUrl = new URL(baseUrl);
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_BASE_URL must be an absolute URL, for example http://localhost:3000");
  }

  return parsedUrl.origin;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
): Promise<string> {
  try {
    const baseUrl = getBaseUrl();

    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId ?? "",
        address: JSON.stringify(metadata.address),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${encodeURIComponent(metadata.orderNumber)}`,
      cancel_url: `${baseUrl}/cart`,
      line_items: items?.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item?.product?.price! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}

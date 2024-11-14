import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ShopifyFormData } from "@/types/formType";

const prisma = new PrismaClient();

// Define the POST method
export async function POST(req: NextRequest) {
  try {
    const data: ShopifyFormData = await req.json();

    console.log(data);

    // Create a new FormResponse record in the database
    const newFormResponse = await prisma.formResponse.create({
      data: {
        businessName: data.businessName,
        businessType: data.businessType || null,
        businessDescription: data.businessDescription || null,
        websitePurpose: data.websitePurpose || null,
        desiredFeatures: data.desiredFeatures || [],
        designPreferences: data.designPreferences || null,
        customerDescription: data.customerDescription || null,
        customerLocations: data.customerLocations || [],
        customerAgeGroups: data.customerAgeGroups || [],
        productOfferings: data.productOfferings || null,
        productCount: data.productCount ? parseInt(data.productCount) : null,
        hasProductDetails: data.hasProductDetails || null,
        hasExistingBranding: data.hasExistingBranding || null,
        brandingDescription: data.brandingDescription || null,
        contentReadiness: data.contentReadiness || null,
        needsContentHelp: data.needsContentHelp || false,
        interestedInMarketing: data.interestedInMarketing || false,
        marketingGoals: data.marketingGoals || [],
        marketingChannels: data.marketingChannels || [],
        currentMarketingTools: data.currentMarketingTools || null,
        desiredLaunchDate: data.desiredLaunchDate
          ? new Date(data.desiredLaunchDate)
          : null,
        budgetEstimate: data.budgetEstimate || null,
        challenges: data.challenges || null,
        additionalInfo: data.additionalInfo || null,
      },
    });

    return NextResponse.json({
      message: "Form submitted successfully",
      data: newFormResponse,
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json(
      { error: "Error saving form data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

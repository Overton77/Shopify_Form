"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { ShopifyFormData } from "@/types/formType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ShopifyQuestionnaire() {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch } = useForm<ShopifyFormData>({
    defaultValues: {
      businessName: "",
      businessType: "",
      businessDescription: "",
      websitePurpose: "",
      desiredFeatures: [],
      designPreferences: "",
      customerDescription: "",
      customerLocations: [],
      customerAgeGroups: [],
      productOfferings: "",
      productCount: "",
      hasProductDetails: "",
      hasExistingBranding: "",
      brandingDescription: "",
      contentReadiness: "",
      needsContentHelp: false,
      interestedInMarketing: false,
      marketingGoals: [],
      marketingChannels: [],
      currentMarketingTools: "",
      desiredLaunchDate: "",
      budgetEstimate: "",
      challenges: "",
      additionalInfo: "",
    },
    mode: "onChange",
  });

  const interestedInMarketing = watch("interestedInMarketing");
  const totalSteps = interestedInMarketing ? 8 : 7;
  const progress = (step / totalSteps) * 100;

  const onSubmit = async (data: ShopifyFormData) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const result = await response.json();
      alert("Form submitted successfully!");
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Step 1: Business Information */}
            <Label className="mt-4">Business Name</Label>
            <Controller
              name="businessName"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
            <Label className="mt-4">Business Type</Label>
            <Controller
              name="businessType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="non-profit">Non-Profit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Label className="mt-4">Business Description</Label>
            <Controller
              name="businessDescription"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
          </>
        );
      case 2:
        return (
          <>
            {/* Step 2: Website Goals */}
            <Label className="mt-4">Primary Purpose of Website</Label>
            <Controller
              name="websitePurpose"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="sell-products"
                        id="sell-products"
                      />
                      <Label htmlFor="sell-products" className="ml-2">
                        Sell Products Online
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="showcase-services"
                        id="showcase-services"
                      />
                      <Label htmlFor="showcase-services" className="ml-2">
                        Showcase Services
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="provide-information"
                        id="provide-information"
                      />
                      <Label htmlFor="provide-information" className="ml-2">
                        Provide Information
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="build-community"
                        id="build-community"
                      />
                      <Label htmlFor="build-community" className="ml-2">
                        Build a Community
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="other"
                        id="website-purpose-other"
                      />
                      <Label htmlFor="website-purpose-other" className="ml-2">
                        Other
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            <Label className="mt-4">Desired Features</Label>
            <Controller
              name="desiredFeatures"
              control={control}
              render={({ field }) => (
                <>
                  {[
                    "Online Store",
                    "Blog",
                    "Customer Reviews",
                    "Appointment Booking",
                    "Live Chat",
                    "Newsletter Signup",
                    "Other",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Checkbox
                        id={feature}
                        checked={(field.value ?? []).includes(feature)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...(field.value ?? []), feature]
                            : (field.value ?? []).filter(
                                (val) => val !== feature
                              );
                          field.onChange(updated);
                        }}
                      />
                      <Label htmlFor={feature} className="ml-2">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />
            <Label className="mt-4">Design Preferences</Label>
            <Controller
              name="designPreferences"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Do you have any design preferences or examples of websites you like?"
                />
              )}
            />
          </>
        );
      // Other steps omitted for brevity
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Shopify Store Questionnaire</CardTitle>
        <CardDescription>
          Step {step} of {totalSteps}
        </CardDescription>
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">{renderStep()}</CardContent>

        <CardFooter className="flex justify-between mt-4">
          <Button type="button" onClick={prevStep} disabled={step === 1}>
            Previous
          </Button>
          {step < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

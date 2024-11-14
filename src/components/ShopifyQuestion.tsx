"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ShopifyQuestionnaire() {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      interestedInMarketing: false,
    },
  });

  const interestedInMarketing = watch("interestedInMarketing");
  const totalSteps = interestedInMarketing ? 8 : 7;
  const progress = (step / totalSteps) * 100;

  const onSubmit = async (data) => {
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
                <Select onValueChange={field.onChange}>
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
                <RadioGroup onValueChange={field.onChange}>
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
                        checked={field.value?.includes(feature)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...(field.value ?? []), feature]
                            : field.value.filter((val) => val !== feature);
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
      case 3:
        return (
          <>
            {/* Step 3: Target Audience */}
            <Label className="mt-4">Customer Description</Label>
            <Controller
              name="customerDescription"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            <Label className="mt-4">Customer Locations</Label>
            <Controller
              name="customerLocations"
              control={control}
              render={({ field }) => (
                <>
                  {["Local", "National", "International"].map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={location}
                        checked={field.value?.includes(location)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...(field.value ?? []), location]
                            : field.value.filter((val) => val !== location);
                          field.onChange(updated);
                        }}
                      />
                      <Label htmlFor={location} className="ml-2">
                        {location}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />
            <Label className="mt-4">Customer Age Groups</Label>
            <Controller
              name="customerAgeGroups"
              control={control}
              render={({ field }) => (
                <>
                  {[
                    "Under 18",
                    "18-24",
                    "25-34",
                    "35-44",
                    "45-54",
                    "55-64",
                    "65+",
                  ].map((ageGroup) => (
                    <div key={ageGroup} className="flex items-center">
                      <Checkbox
                        id={ageGroup}
                        checked={field.value?.includes(ageGroup)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...(field.value ?? []), ageGroup]
                            : field.value.filter((val) => val !== ageGroup);
                          field.onChange(updated);
                        }}
                      />
                      <Label htmlFor={ageGroup} className="ml-2">
                        {ageGroup}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />
          </>
        );
      case 4:
        return (
          <>
            {/* Step 4: Products or Services */}
            <Label className="mt-4">Product/Service Offerings</Label>
            <Controller
              name="productOfferings"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="What products or services do you offer?"
                />
              )}
            />
            <Label className="mt-4">Number of Products/Services</Label>
            <Controller
              name="productCount"
              control={control}
              render={({ field }) => <Input type="number" {...field} />}
            />
            <Label className="mt-4">
              Do you have product descriptions and images ready?
            </Label>
            <Controller
              name="hasProductDetails"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="yes" id="product-details-yes" />
                      <Label htmlFor="product-details-yes" className="ml-2">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="no" id="product-details-no" />
                      <Label htmlFor="product-details-no" className="ml-2">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="need-help"
                        id="product-details-need-help"
                      />
                      <Label
                        htmlFor="product-details-need-help"
                        className="ml-2"
                      >
                        Need Help Creating Them
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
          </>
        );
      case 5:
        return (
          <>
            {/* Step 5: Branding and Content */}
            <Label className="mt-4">
              Do you have existing branding materials (logo, color scheme)?
            </Label>
            <Controller
              name="hasExistingBranding"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="yes" id="branding-yes" />
                      <Label htmlFor="branding-yes" className="ml-2">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="no" id="branding-no" />
                      <Label htmlFor="branding-no" className="ml-2">
                        No
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            <Label className="mt-4">Describe your brand look and feel</Label>
            <Controller
              name="brandingDescription"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            <Label className="mt-4">
              Do you have website content ready (text, images)?
            </Label>
            <Controller
              name="contentReadiness"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <RadioGroupItem value="yes" id="content-ready-yes" />
                      <Label htmlFor="content-ready-yes" className="ml-2">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="no" id="content-ready-no" />
                      <Label htmlFor="content-ready-no" className="ml-2">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem
                        value="partially"
                        id="content-ready-partially"
                      />
                      <Label htmlFor="content-ready-partially" className="ml-2">
                        Partially
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            <Label className="mt-4">
              Would you like assistance with content creation?
            </Label>
            <Controller
              name="needsContentHelp"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </>
        );
      case 6:
        return (
          <>
            {/* Step 6: Digital Marketing (Optional) */}
            <Label className="mt-4">
              Are you interested in digital marketing services?
            </Label>
            <Controller
              name="interestedInMarketing"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            {interestedInMarketing && (
              <>
                <Label className="mt-4">Marketing Goals</Label>
                <Controller
                  name="marketingGoals"
                  control={control}
                  render={({ field }) => (
                    <>
                      {[
                        "Increase Website Traffic",
                        "Boost Online Sales",
                        "Improve Brand Awareness",
                        "Engage Customers",
                        "Other",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center">
                          <Checkbox
                            id={goal}
                            checked={field.value?.includes(goal)}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...(field.value ?? []), goal]
                                : field.value.filter((val) => val !== goal);
                              field.onChange(updated);
                            }}
                          />
                          <Label htmlFor={goal} className="ml-2">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                />
                <Label className="mt-4">Preferred Marketing Channels</Label>
                <Controller
                  name="marketingChannels"
                  control={control}
                  render={({ field }) => (
                    <>
                      {[
                        "SEO",
                        "Social Media",
                        "Email Marketing",
                        "Pay-Per-Click Advertising",
                        "Content Marketing",
                        "Other",
                      ].map((channel) => (
                        <div key={channel} className="flex items-center">
                          <Checkbox
                            id={channel}
                            checked={field.value?.includes(channel)}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...(field.value ?? []), channel]
                                : field.value.filter((val) => val !== channel);
                              field.onChange(updated);
                            }}
                          />
                          <Label htmlFor={channel} className="ml-2">
                            {channel}
                          </Label>
                        </div>
                      ))}
                    </>
                  )}
                />
                <Label className="mt-4">
                  Are you currently using any marketing tools or platforms?
                </Label>
                <Controller
                  name="currentMarketingTools"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Please list any tools or platforms you're using"
                    />
                  )}
                />
              </>
            )}
          </>
        );
      case 7:
        return (
          <>
            {/* Step 7: Project Timeline and Budget */}
            <Label className="mt-4">
              When would you like your website to go live?
            </Label>
            <Controller
              name="desiredLaunchDate"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
            <Label className="mt-4">
              What is your estimated budget for this project?
            </Label>
            <Controller
              name="budgetEstimate"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1000">Under $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="over-10000">Over $10,000</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </>
        );
      case 8:
        return (
          <>
            {/* Step 8: Additional Information */}
            <Label className="mt-4">
              Do you have any specific challenges or concerns?
            </Label>
            <Controller
              name="challenges"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            <Label className="mt-4">
              Any other information you would like to share?
            </Label>
            <Controller
              name="additionalInfo"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
          </>
        );
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

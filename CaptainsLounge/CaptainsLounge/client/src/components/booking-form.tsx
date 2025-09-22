import { useState } from "react";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Stripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AddOnService {
  name: string;
  price: number;
}

interface TimeSlot {
  timeSlot: string;
  isAvailable: boolean;
}

const TIME_SLOTS = [
  { id: "6am-10am", label: "Early Bird", time: "6:00 AM - 10:00 AM", description: "Perfect for early flights, includes breakfast service" },
  { id: "10am-2pm", label: "Morning Refresh", time: "10:00 AM - 2:00 PM", description: "Post-checkout relaxation with lunch options" },
  { id: "2pm-6pm", label: "Afternoon Escape", time: "2:00 PM - 6:00 PM", description: "Beat the heat with spa treatments and tea ceremonies" },
  { id: "6pm-10pm", label: "Evening Unwind", time: "6:00 PM - 10:00 PM", description: "Pre-flight relaxation with dinner and entertainment" }
];

interface BookingFormProps {
  stripePromise: Promise<Stripe | null>;
}

function BookingFormContent({ onClientSecretCreated }: { onClientSecretCreated?: (secret: string) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<AddOnService[]>([]);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    flightDetails: ""
  });

  const dateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  // Fetch available time slots for selected date
  const { data: availability, isLoading: availabilityLoading } = useQuery({
    queryKey: ['/api/availability', dateString],
    enabled: !!dateString,
  });

  // Fetch add-on services
  const { data: services } = useQuery<AddOnService[]>({
    queryKey: ['/api/services'],
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest("POST", "/api/create-booking", bookingData);
      return response.json();
    },
    onSuccess: (data) => {
      if (onClientSecretCreated) {
        onClientSecretCreated(data.clientSecret);
      }
      setClientSecret(data.clientSecret);
      setBookingId(data.bookingId);
      toast({
        title: "Booking Created",
        description: "Please complete your payment to confirm the booking.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      bookingDate: format(selectedDate, 'yyyy-MM-dd'),
      timeSlot: selectedSlot,
      addOnServices: selectedServices,
      specialRequests: formData.specialRequests,
      flightDetails: formData.flightDetails,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
    };

    createBookingMutation.mutate(bookingData);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const totalPrice = 20 + selectedServices.reduce((sum, service) => sum + service.price, 0);

  const handleServiceChange = (service: AddOnService, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s.name !== service.name));
    }
  };

  // If no client secret, show booking form
  if (!clientSecret) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Select Your Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date(Date.now() - 86400000)}
                  className="rounded-md border"
                  data-testid="calendar-date-picker"
                />
              </CardContent>
            </Card>

            {/* Time Slot Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Choose Your Time Slot</CardTitle>
                <p className="text-muted-foreground">All slots include base 4-hour access for $20 USD</p>
              </CardHeader>
              <CardContent>
                {availabilityLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {TIME_SLOTS.map((slot) => {
                      const isAvailable = availability?.availability.find(
                        (a: TimeSlot) => a.timeSlot === slot.id
                      )?.isAvailable ?? true;
                      
                      return (
                        <div key={slot.id} className="space-y-2">
                          <label className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedSlot === slot.id 
                              ? 'border-primary bg-primary/5' 
                              : isAvailable 
                                ? 'border-border hover:border-primary/50' 
                                : 'border-border/50 bg-muted/50 cursor-not-allowed'
                          }`}>
                            <input
                              type="radio"
                              name="timeSlot"
                              value={slot.id}
                              checked={selectedSlot === slot.id}
                              onChange={(e) => setSelectedSlot(e.target.value)}
                              disabled={!isAvailable}
                              className="sr-only"
                              data-testid={`radio-time-slot-${slot.id}`}
                            />
                            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                              selectedSlot === slot.id 
                                ? 'border-primary bg-primary' 
                                : 'border-border'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-semibold ${
                                  !isAvailable ? 'text-muted-foreground' : 'text-foreground'
                                }`}>
                                  {slot.label}
                                </h3>
                                <span className={`text-sm px-2 py-1 rounded ${
                                  isAvailable 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {isAvailable ? 'Available' : 'Fully Booked'}
                                </span>
                              </div>
                              <p className={`text-sm font-medium ${
                                !isAvailable ? 'text-muted-foreground' : 'text-foreground'
                              }`}>
                                {slot.time}
                              </p>
                              <p className={`text-sm ${
                                !isAvailable ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                {slot.description}
                              </p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add-on Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Enhance Your Experience</CardTitle>
                <p className="text-muted-foreground">Optional services to make your stay more memorable</p>
              </CardHeader>
              <CardContent>
                {services ? (
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={service.name} className="flex items-center space-x-3">
                        <Checkbox
                          id={service.name}
                          checked={selectedServices.some(s => s.name === service.name)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                          data-testid={`checkbox-service-${index}`}
                        />
                        <label htmlFor={service.name} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{service.name}</span>
                            <span className="text-primary font-semibold">+${service.price}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+94 77 123 4567"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="flightDetails">Flight Details (Optional)</Label>
                    <Textarea
                      id="flightDetails"
                      value={formData.flightDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, flightDetails: e.target.value }))}
                      placeholder="Flight number and departure time"
                      data-testid="textarea-flight-details"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Any special requirements or requests"
                      data-testid="textarea-special-requests"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createBookingMutation.isPending}
                    data-testid="button-create-booking"
                  >
                    {createBookingMutation.isPending ? "Creating Booking..." : `Continue to Payment - $${totalPrice.toFixed(2)} USD`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold playfair">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>4-Hour Slot</span>
                    <span data-testid="text-base-price">$20.00</span>
                  </div>
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{service.name}</span>
                      <span data-testid={`text-service-price-${index}`}>+${service.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span data-testid="text-total-price">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-shield-alt text-primary"></i>
                    Secure payment processing
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-undo text-primary"></i>
                    Free cancellation up to 2 hours before
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // This should never render in BookingFormContent since we separated the components
  return null;
}

function PaymentFormContent() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const totalPrice = 20; // This should be calculated properly, but for now keeping simple

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold playfair">Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <PaymentElement />
            
            <div className="border-t border-border pt-6">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total Amount</span>
                <span data-testid="text-payment-total">${totalPrice.toFixed(2)} USD</span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!stripe || isProcessingPayment}
                data-testid="button-complete-payment"
              >
                {isProcessingPayment ? "Processing..." : `Pay $${totalPrice.toFixed(2)} USD`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookingForm({ stripePromise }: BookingFormProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  
  // Only wrap in Elements when we have a clientSecret for payment
  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentFormContent />
      </Elements>
    );
  }
  
  // For initial booking form, don't use Elements context
  return <BookingFormContent onClientSecretCreated={setClientSecret} />;
}